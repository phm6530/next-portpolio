import classes from "./CommentContainer.module.scss";
import { Dispatch, SetStateAction } from "react";

import { CommentReponse } from "@/types/comment.type";
import { useParams } from "next/navigation";
import MessageForm from "./message-form";
import MessageItem from "./message-item";
import { Button } from "../ui/button";
import { COMMENT_EDITOR_MODE } from "./context/comment-context";
import { Reply, ReplyIcon } from "lucide-react";

export default function MessageThread({
  touchIdx,
  setTouch,
  ...props
}: {
  touchIdx: number | null;
  parentId: number;
  setTouch: Dispatch<SetStateAction<number | null>>;
} & CommentReponse) {
  const { id: commentId, replies } = props;
  const params: { id: string } = useParams();

  const formViewHandler = () => {
    setTouch((prev) => {
      if (prev === commentId) {
        return null;
      } else {
        return commentId;
      }
    });
  };

  return (
    <div className="animate-fadein">
      {/* Comment */}
      <MessageItem
        contentType="comment"
        {...props}
        onClickEvent={formViewHandler}
        boardId={params.id}
      />

      <Button
        onClick={formViewHandler}
        variant={"link"}
        className="p-0 dark:text-indigo-400"
      >
        <span className="text-[12px]">답글쓰기</span>
      </Button>

      {/* 대댓글 */}
      <div className="flex flex-col gap-4 mb-4">
        {replies.map((reply, idx) => {
          const { content, ...rest } = reply;
          return (
            <div className={classes.replyWrapper}>
              <ReplyIcon className="rotate-180 opacity-50 mr-2" />
              <MessageItem
                key={`reply-${commentId}-${idx}`}
                contentType="reply"
                content={content}
                onClickEvent={formViewHandler}
                {...rest}
                boardId={params.id}
              />
            </div>
          );
        })}
        {touchIdx === commentId && (
          <div className={classes.replyFormContainer}>
            {/* Reply 용 */}
            <MessageForm
              commentId={commentId}
              EDITOR_MODE={COMMENT_EDITOR_MODE.REPLY}
              parentsId={params.id}
              setTouch={setTouch}
            />
          </div>
        )}
      </div>
    </div>
  );
}
