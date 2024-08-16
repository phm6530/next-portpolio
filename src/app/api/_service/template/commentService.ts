import { MessageProps } from "@/app/_components/Comment/CommentSection";
import selectCommentList from "@/app/api/_dao/commentRepositroy";
import { withConnection, withTransition } from "@/app/lib/helperServer";
import { userProps } from "@/types/user";
import bcrypt from "bcrypt";
import { ResultSetHeader } from "mysql2";

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
    await withTransition(async (conn) => {
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

      // 댓글인지 대댓글인지에 따라 다른 테이블에 삽입
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

      await conn.query<ResultSetHeader>(insertCommentSql, [
        msg,
        whereId,
        visitorResult.insertId,
      ]);
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
    const find = acc.find((e) => e.id === cur.comment_id);
    if (!find) {
      acc.push({
        id: cur.comment_id,
        create_at: cur.comment_created_at,
        msg: cur.comment_message,
        user: {
          username: cur.comment_user_nick,
          userId: cur.comment_user_id,
          role: cur.comment_user_role,
        },
        reply: [],
      });
    } else {
      find.reply.push({
        id: cur.reply_id,
        create_at: cur.reply_created_at,
        msg: cur.reply_message,
        user: {
          username: cur.reply_user_nick,
          userId: cur.reply_user_id,
          role: cur.reply_user_role,
        },
      });
    }

    return acc;
  }, []);

  console.log("1 호출");

  return comment;
}
