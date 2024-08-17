import { MessageProps } from "@/app/_components/Comment/CommentSection";
import selectCommentList from "@/app/api/_dao/commentRepositroy";
import { withConnection, withTransaction } from "@/app/lib/helperServer";
import { userProps } from "@/types/user";
import bcrypt from "bcrypt";
import { ResultSetHeader, RowDataPacket } from "mysql2";
import { Pool, PoolConnection } from "mysql2/promise";

type postCommentProps = {
  name: string;
  password: string;
  msg: string;
  templateId?: number;
  commentId?: number;
};

//CommentList + Reply
export type GetCommentListProps = {
  // comment
  comment_id: number;
  comment_created_at: string;
  comment_message: string;
  comment_user_role: userProps["role"];
  comment_user_id: string;
  comment_user_nick: string;

  //Reply
  reply_id: number;
  reply_created_at: string;
  reply_message: string;
  reply_user_role: userProps["role"];
  reply_user_id: string;
  reply_user_nick: string;
};

export async function postComment(data: postCommentProps) {
  const { name: nickName, password, msg, templateId, commentId } = data;
  const hashedPassword = await bcrypt.hash(password, 10);

  const role = "visitor"; // 익명 사용자

  // Id Check
  if (commentId || templateId) {
    return withTransaction<ResultSetHeader>(async (conn) => {
      // 사용자 정보 삽입
      const insertUserSql = `
        INSERT INTO 
          user_visitor (nick_name, password, role) 
        VALUES (?, ?, ?);
      `;

      const [visitorResult] = await conn.query<ResultSetHeader>(insertUserSql, [
        nickName,
        hashedPassword,
        role,
      ]);

      // 댓글인지 대댓글인지
      const insertCommentSql = commentId
        ? `
          INSERT INTO 
            result_reply (created_at, message, comment_id, visitor_id) 
          VALUES (now(), ?, ?, ?);
        `
        : `
          INSERT INTO 
            result_comment (created_at, message, template_id, visitor_id) 
          VALUES (now(), ?, ?, ?);
        `;

      const whereId = commentId || templateId;

      const [test] = await conn.query<ResultSetHeader>(insertCommentSql, [
        msg,
        whereId,
        visitorResult.insertId,
      ]);
      return test;
    });
  } else {
    throw new Error("요청이 잘못 되었습니다.");
  }
}

export async function getCommentList(templateId: number) {
  const data = await withConnection(async (conn) => {
    return selectCommentList({
      conn,
      templateId,
    }) as Promise<GetCommentListProps[]>;
  });

  //구조 변경
  const comment = data.reduce<MessageProps[]>((acc, cur) => {
    const find = acc.find((e) => e.comment_id === cur.comment_id);

    if (!find) {
      acc.push({
        comment_id: cur.comment_id,
        create_at: cur.comment_created_at,
        msg: cur.comment_message,
        user: {
          username: cur.comment_user_nick,
          userId: cur.comment_user_id,
          role: cur.comment_user_role,
        },
        reply: cur.reply_id
          ? [
              {
                reply_id: cur.reply_id,
                create_at: cur.reply_created_at,
                msg: cur.reply_message,
                user: {
                  username: cur.reply_user_nick,
                  userId: cur.reply_user_id,
                  role: cur.reply_user_role,
                },
              },
            ]
          : [],
      });
    } else {
      if (cur.reply_id) {
        // reply_id가 존재할 경우에만 push
        find.reply.push({
          reply_id: cur.reply_id,
          create_at: cur.reply_created_at,
          msg: cur.reply_message,
          user: {
            username: cur.reply_user_nick,
            userId: cur.reply_user_id,
            role: cur.reply_user_role,
          },
        });
      }
    }

    return acc;
  }, []);

  return comment;
}

export const chkUserMessage = async (
  targetTable: string,
  user_id: string,
  msgId: string
) => {
  return withConnection<boolean>(async (conn) => {
    const sql = `
    SELECT rc.id FROM ${targetTable} rc
      JOIN 
        user
      ON
        user.id = rc.user_id
      WHERE
        user.user_id = ? AND rc.id = ?;
    `;
    const [result] = await conn.query<RowDataPacket[]>(sql, [user_id, msgId]);
    return result.length > 0 ? true : false;
  });
};

export const chkPasswordMatch = async (
  targetTable: string,
  password: string,
  msgId: string
) => {
  const { password: getPassword } = await withConnection<RowDataPacket>(
    async (conn) => {
      const sql = `
    SELECT password FROM ${targetTable} rc
    JOIN 
      user_visitor uv
    ON 
      rc.visitor_id = uv.id
    where 
      rc.id = ?;
  `;
      const [rows] = await conn.query<RowDataPacket[]>(sql, [msgId]);
      return rows[0];
    }
  );

  if (!getPassword || !password) {
    throw new Error("비밀번호 또는 저장된 비밀번호가 없습니다.");
  }

  //비밀번호 매치 확인
  return bcrypt.compare(password, getPassword);
};

export const removeMessage = async (targetTable: string, msgId: string) => {
  const [result] = await withConnection(async (conn) => {
    const sql = `
    DELETE FROM ${targetTable} where id = ?;
  `;
    return conn.query<ResultSetHeader>(sql, [msgId]);
  });

  return result;
};
