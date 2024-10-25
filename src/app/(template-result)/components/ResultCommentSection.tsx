"use client";
import { BASE_NEST_URL } from "@/config/base";
import { QUERY_KEY } from "@/types/constans";
import requestHandler from "@/utils/withFetch";
import { useQuery } from "@tanstack/react-query";
import classes from "./ResultCommentSection.module.scss";
import Comment from "@/app/(template-result)/components/Comment";
import { useState } from "react";
import NotFoundComponent from "@/components/NotFoundComponent";
import CommentContainer from "@/app/(template-result)/components/CommentContainer";

//tempalte ID
export default function ResultCommentSection({
  type,
  id,
}: {
  type: string;
  id: string;
}) {
  const [touchFormIdx, setTouchFormIdx] = useState<null | number>(null);

  const { data } = useQuery<CommentReponse[]>({
    queryKey: [QUERY_KEY.COMMENTS, id],
    queryFn: async () =>
      requestHandler(async () => {
        return fetch(`${BASE_NEST_URL}/comment/${type}/${id}`, {
          cache: "no-store",
        });
      }),
    staleTime: 10000,
  });

  if (!data) {
    throw new Error("에러");
  }

  return (
    <div className={classes.commentSection}>
      <div className={classes.commentCount}>
        댓글 <span>{data.length}</span> 개
      </div>

      <div className={classes.commentsWrapper}>
        {data.length > 0 ? (
          data.map((comment: CommentReponse, idx) => (
            <CommentContainer
              {...comment}
              touchIdx={touchFormIdx}
              key={`comment-${id}-${idx}`}
              setTouch={setTouchFormIdx}
            />
          ))
        ) : (
          //댓글 없음ㅇㅇㅇ
          <NotFoundComponent.reply />
        )}
      </div>
    </div>
  );
}
