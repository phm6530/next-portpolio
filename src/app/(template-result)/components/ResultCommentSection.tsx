"use client";
import { QUERY_KEY } from "@/types/constans";
import { useQuery } from "@tanstack/react-query";
import classes from "./ResultCommentSection.module.scss";
import { useState } from "react";
import NotFoundComponent from "@/components/NotFoundComponent";
import CommentContainer from "@/app/(template-result)/components/CommentContainer";
import { fetchComments } from "@/app/(template-result)/result/survey/components/test";
import { COMMENT_NEED_PATH, CommentReponse } from "@/types/comment.type";

//tempalte ID
export default function ResultCommentSection({
  type,
  id,
}: {
  type: COMMENT_NEED_PATH;
  id: number;
}) {
  const [touchFormIdx, setTouchFormIdx] = useState<null | number>(null);

  const { data, isError, isLoading } = useQuery<CommentReponse[]>({
    queryKey: [QUERY_KEY.COMMENTS, id],
    queryFn: async () => {
      return await fetchComments<CommentReponse[]>(id, type);
    },
    staleTime: 10000,
  });

  if (isLoading) {
    return <>loading......</>;
  }

  if (isError) {
    throw new Error("에러");
  }

  return (
    <div className={classes.commentSection}>
      <div className={classes.commentCount}>
        댓글 <span>{data?.length}</span> 개
      </div>

      <div className={classes.commentsWrapper}>
        {data && data.length > 0 ? (
          data.map((comment: CommentReponse, idx) => {
            return (
              <CommentContainer
                {...comment}
                parentId={id}
                touchIdx={touchFormIdx}
                key={`comment-${id}-${idx}`}
                setTouch={setTouchFormIdx}
              />
            );
          })
        ) : (
          //댓글 없음ㅇㅇㅇ
          <NotFoundComponent.reply />
        )}
      </div>
    </div>
  );
}
