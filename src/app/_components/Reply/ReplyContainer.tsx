import ReplyForm from "@/app/_components/Reply/ReplyForm";
import { userProps } from "@/types/user";
import classes from "./Reply.module.scss";

import Reply from "@/app/_components/Reply/Reply";

export type ReplyProps = {
  idx: number;
  comment: string;
  user: Required<userProps>;
  create_at: string;
  reply?: ReplyProps[]; // 재귀
};

export default function ReplyContainer() {
  const replyList: ReplyProps[] = [
    {
      idx: 1,
      comment: "안녕하세요",
      create_at: "2024-08-15 04:00:06",
      user: {
        userId: "phm6530",
        username: "itMe",
        rule: "visitor",
      },
      reply: [
        {
          idx: 1,
          comment: "ㅋㅋㅋ",
          create_at: "2024-01-22",
          user: {
            userId: null,
            username: "방문자",
            rule: "visitor",
          },
        },
        {
          idx: 2,
          comment: "hello World",
          create_at: "2024-08-15 04:11:02",
          user: {
            userId: "squirrel309",
            username: "박현민",
            rule: "admin",
          },
        },
      ],
    },
  ];

  return (
    <>
      <h1>댓글 0 개</h1>
      <ReplyForm />
      {replyList.map((comment) => {
        return (
          <div className={classes.commentContainer}>
            <div className={classes.commentWrapper}>
              <Reply
                idx={comment.idx}
                userId={comment.user.userId}
                username={comment.user.username}
                create_at={comment.create_at}
                comment={comment.comment}
                rule={comment.user.rule}
              />
              <div>
                <button>댓글 숨기기</button>
                <button>답글 달기</button>
              </div>
            </div>

            <div className={classes.replyWrapper}>
              {comment.reply?.map((e) => {
                return (
                  <Reply
                    idx={e.idx}
                    userId={e.user.userId}
                    username={e.user.username}
                    create_at={comment.create_at}
                    comment={e.comment}
                    rule={e.user.rule}
                  />
                );
              })}
            </div>
            <button>답글 달기</button>
          </div>
        );
      })}
    </>
  );
}
