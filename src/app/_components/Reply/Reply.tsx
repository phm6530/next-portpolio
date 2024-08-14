import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import classes from "./Reply.module.scss";
import "dayjs/locale/ko";

import { ReplyProps } from "@/app/_components/Reply/ReplyContainer";
import { userProps } from "@/types/user";

//import
dayjs.extend(relativeTime);
dayjs.locale("ko");

export default function Reply({
  idx,
  userId,
  username,
  create_at,
  comment,
  rule,
}: Omit<ReplyProps, "user" | "reply"> &
  userProps & { rule: "visitor" | "admin" }) {
  return (
    <>
      <div>
        {username} {rule === "admin" && "M"}
        <span>{dayjs(create_at).fromNow()}</span>
        <button type="button">삭제</button>
      </div>
      <div className={classes.comment}>{comment}</div>
    </>
  );
}
