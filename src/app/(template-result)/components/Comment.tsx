"use client";
import UserRoleDisplay from "@/components/ui/userRoleDisplay/UserRoleDisplay";
import classes from "./Comment.module.scss";
import Button from "@/components/ui/button/Button";
import dayjs from "dayjs";
import "dayjs/locale/ko";

import relativeTime from "dayjs/plugin/relativeTime";

//import
dayjs.extend(relativeTime);
dayjs.locale("ko");

export default function Comment({
  id,
  createAt,
  comment,
  user,
  anonymous,
  onClickEvent,
}: { onClickEvent?: () => void } & Omit<CommentReponse, "replies">) {
  const deleteMessage = () => {
    const msgPassword = prompt("비밀번호를 입력해주세요");
  };

  return (
    <div className={classes.commentContainer}>
      <div className={classes.commentSurmmry}>
        {/* 익명일때 */}
        {anonymous && !user && (
          <UserRoleDisplay user_nickname={anonymous} user_role={"anonymous"} />
        )}

        <span style={{ marginRight: "20px" }}>{dayjs(createAt).fromNow()}</span>
        <Button.closeBtn onClick={deleteMessage} />
      </div>
      <div className={classes.comment} onClick={onClickEvent}>
        {comment}
      </div>
    </div>
  );
}
