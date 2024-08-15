import MsgForm from "@/app/_components/Comment/MsgForm";
import { userProps } from "@/types/user";
import classes from "./Reply.module.scss";
import CommentContainer from "@/app/_components/Comment/CommentContainer";

export type MessageProps = {
  idx: number;
  msg: string;
  user: Required<userProps>;
  create_at: string;
  reply?: Omit<MessageProps, "reply">[];
};
const replyList: MessageProps[] = [
  {
    idx: 1,
    msg: "안녕하세요",
    create_at: "2024-08-15 04:00:06",
    user: {
      userId: "phm6530",
      username: "itMe",
      rule: "visitor",
    },
    reply: [
      {
        idx: 1,
        msg: "ㅋㅋㅋ",
        create_at: "2024-01-22",
        user: {
          userId: null,
          username: "방문자",
          rule: "visitor",
        },
      },
      {
        idx: 2,
        msg: "hello World",
        create_at: "2024-08-15 04:11:02",
        user: {
          userId: "squirrel309",
          username: "박현민",
          rule: "admin",
        },
      },
    ],
  },

  {
    idx: 1,
    msg: "안녕하세요",
    create_at: "2024-08-15 04:00:06",
    user: {
      userId: "phm6530",
      username: "itMe",
      rule: "visitor",
    },
    reply: [
      {
        idx: 1,
        msg: "ㅋㅋㅋ",
        create_at: "2024-01-22",
        user: {
          userId: null,
          username: "방문자",
          rule: "visitor",
        },
      },
      {
        idx: 2,
        msg: "hello World",
        create_at: "2024-08-15 04:11:02",
        user: {
          userId: "squirrel309",
          username: "박현민",
          rule: "admin",
        },
      },
    ],
  },
  {
    idx: 1,
    msg: "안녕하세요",
    create_at: "2024-08-15 04:00:06",
    user: {
      userId: "phm6530",
      username: "itMe",
      rule: "visitor",
    },
    reply: [],
  },
];

export default function rCommentSection() {
  return (
    <>
      <h1>댓글 {replyList.length} 개</h1>
      <MsgForm />

      {replyList.length > 0
        ? replyList.map((comment, CommentIdx) => {
            return (
              <div
                className={classes.commentContainer}
                key={`comment-${CommentIdx}`}
              >
                {/* Comment */}
                <CommentContainer comment={comment} />
              </div>
            );
          })
        : "댓글이 없습니다"}
    </>
  );
}
