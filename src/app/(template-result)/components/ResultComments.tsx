import Comment from "@/app/(template-result)/components/Comment";
import CommentEditor from "@/app/(template-result)/components/CommentEditor";
import classes from "./ResultComments.module.scss";
import { BASE_NEST_URL } from "@/config/base";

//tempalte ID
export default async function ResultComments({
  type,
  id,
}: {
  type: string;
  id: string;
}) {
  const response = await fetch(`${BASE_NEST_URL}/comment/${type}/${id}`);
  if (!response.ok) {
    throw new Error("error....");
  }
  const data: CommentReponse[] = await response.json();

  return (
    <>
      {/* 댓글폼 */}
      <CommentEditor id={id} />
      <div className={classes.commentsWrapper}>
        {data.map((e: CommentReponse) => {
          const { replies, ...rest } = e;

          return (
            <>
              <Comment {...rest} />
              <div className={classes.commentController}></div>
              <div className={classes.repliesCotainer}>
                {replies.map((e) => {
                  const { reply, ...rest } = e;

                  return <Comment comment={reply} {...rest} />;
                })}
                {/* <CommentEditor id={id} /> */}
              </div>
            </>
          );
        })}
      </div>
    </>
  );
}
