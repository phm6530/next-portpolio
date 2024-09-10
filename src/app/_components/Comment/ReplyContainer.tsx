import MsgItem from "@/app/_components/Comment/MsgItem";
import classes from "./Msg.module.scss";
import MsgForm from "@/app/_components/Comment/MsgForm";
import Button from "@/app/_components/ui/button/Button";
import { MessageProps } from "@/app/_components/Comment/CommentSection";
import ReplyIcon from "/public/asset/icon/reply.svg";

export default function ReplyContainer({
  comment_id,
  commentIdx,
  replys,
  replyIdx,
  formHandler,
}: {
  comment_id?: number;
  commentIdx: number;
  replys: MessageProps["reply"];
  replyIdx: null | number;
  formHandler: () => void;
}) {
  if (!replys) {
    return null; // replys가 없는 경우, 빈 상태를 명확히 처리
  }

  return (
    <>
      <div
        className={
          replys!.length === 0 ? classes.replyNone : classes.replyActive
        }
      >
        {replys && (
          <div className={classes.repleylist}>
            {replys.map((e, idx) => {
              return (
                <div
                  className={classes.replyWrap}
                  key={`reply-${idx}`}
                  style={{ display: "flex" }}
                >
                  <ReplyIcon className={classes.replyIcon} />
                  <MsgItem
                    reply_id={e.reply_id}
                    userId={e.user.userId}
                    username={e.user.username}
                    create_at={e.create_at}
                    msg={e.msg}
                    role={e.user.role}
                  />
                </div>
              );
            })}
          </div>
        )}

        {replys!.length === 0 ? null : (
          <div
            className={classes.commentBtnWrap}
            style={{ marginLeft: "27px" }}
          >
            <Button.noneStyleButton
              fontSize={12}
              color={replyIdx === commentIdx ? "red" : undefined}
              onClick={formHandler}
            >
              {replyIdx === commentIdx ? "댓글창 닫기" : "답글쓰기"}
            </Button.noneStyleButton>
          </div>
        )}

        {commentIdx === replyIdx && (
          <div style={{ marginTop: "10px" }}>
            <MsgForm comment_id={comment_id} />
          </div>
        )}
      </div>
    </>
  );
}
