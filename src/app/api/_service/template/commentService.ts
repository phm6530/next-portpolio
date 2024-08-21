import { MessageProps } from "@/app/_components/Comment/CommentSection";
import { comparePassword } from "@/app/lib/comparePassword";
import { withConnection, withTransaction } from "@/app/lib/helperServer";
import { auth } from "@/auth";
import { userProps } from "@/types/user";
import { ResultSetHeader, RowDataPacket } from "mysql2";

import selectCommentList from "@/app/api/_dao/commentRepositroy";
import bcrypt from "bcrypt";

type postCommentProps = {
  name: string;
  password: string;
  msg: string;
  template_id?: number;
  comment_id?: number;
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
  const session = (await auth()) as {
    user: {
      user_id: string;
      user_name: string;
      user_nickname: string;
      role: "admin" | "visitor";
    };
  };

  const { name: nickName, password, msg, template_id, comment_id } = data;

  // table 매핑
  const targetTable = template_id
    ? "result_comment"
    : comment_id
    ? "result_reply"
    : (null as never);

  //Column 매핑
  const targetColumn = template_id
    ? "template_id"
    : comment_id
    ? "comment_id"
    : (null as never);

  //template or comment id
  const whereId = comment_id || template_id;

  if (session && session.user.role === "admin") {
    console.log("진입");
    // 로그인한 사용자 처리 로직
    const userId = session.user.user_id;
    // 댓글인지 대댓글인지에 따라 처리
    return withTransaction<ResultSetHeader>(async (conn) => {
      const getUserId = `SELECT id FROM user where user_id = ?;`;
      const [rows] = await conn.query<RowDataPacket[]>(getUserId, [userId]);

      const insertCommentSql = `
        INSERT INTO 
          ${targetTable} (created_at, message, ${targetColumn}, user_id) 
        VALUES (now(), ?, ?, ?);
      `;

      const [result] = await conn.query<ResultSetHeader>(insertCommentSql, [
        msg,
        whereId,
        rows[0].id,
      ]);

      return result;
    });
  } else {
    console.log("진입");

    const hashedPassword = await bcrypt.hash(password, 10);
    const ROLE = "visitor"; // 익명 사용자 role
    // Id Check
    if (comment_id || template_id) {
      return withTransaction<ResultSetHeader>(async (conn) => {
        // 사용자 정보 삽입
        const insertUserSql = `
        INSERT INTO 
          user_visitor (nick_name, password, role) 
        VALUES (?, ?, ?);
      `;

        const [visitorResult] = await conn.query<ResultSetHeader>(
          insertUserSql,
          [nickName, hashedPassword, ROLE]
        );

        // 댓글인지 대댓글인지
        const insertCommentSql = `
        INSERT INTO 
          ${targetTable} (created_at, message, ${targetColumn}, visitor_id) 
        VALUES (now(), ?, ?, ?);
    `;

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
  return comparePassword(getPassword, password);
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
