import { MessageProps } from "@/app/_components/Comment/CommentSection";
import selectCommentList from "@/app/api/_dao/commentRepositroy";
import { withConnection } from "@/app/lib/helperServer";
import { userProps } from "@/types/user";

type postCommentProps = {
  name: string;
  password: string;
  reply: string;
};

//CommentList + Reply
export type GetCommentListProps = {
  // comment
  comment_id: number;
  comment_created_at: string;
  comment: string;
  comment_user: Required<userProps>;

  //Reply
  reply_id: number;
  reply_message: string;
  reply_user: Required<userProps>;
  reply_created_at: string;
};

export async function postComment(data: postCommentProps) {
  console.log(data);
  return 1;
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
        msg: cur.comment,
        user: {
          username: "리슨업",
          userId: "squirrel309",
          rule: "admin",
        },
        reply: [],
      });
    } else {
      find.reply.push({
        id: cur.reply_id,
        create_at: cur.reply_created_at,
        msg: cur.reply_message,
        user: {
          username: "리슨업",
          userId: "squirrel309",
          rule: "admin",
        },
      });
    }

    return acc;
  }, []);

  return comment;
}
