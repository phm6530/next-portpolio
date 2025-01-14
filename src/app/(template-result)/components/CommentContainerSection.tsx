"use client";
import { CommentReponse } from "@/types/comment.type";
import CommentContainer from "./CommentContainer";
import { useState } from "react";

export default function CommentContainerSection({
  listData,
}: {
  listData: CommentReponse[];
}) {
  const [touchFormIdx, setTouchFormIdx] = useState<null | number>(
    null
  );

  return (
    <>
      {listData.map((e, idx) => {
        return (
          <CommentContainer
            {...e}
            parentId={e.id}
            touchIdx={touchFormIdx}
            key={`comment-${e.id}-${idx}`}
            setTouch={setTouchFormIdx}
          />
        );
      })}
    </>
  );
}
