"use client";
import { CommentReponse } from "@/types/comment.type";

import { useState } from "react";
import MessageThread from "./message-thread";

export default function MessageContainer({
  listData,
}: {
  listData: CommentReponse[];
}) {
  const [touchFormIdx, setTouchFormIdx] = useState<null | number>(null);

  return (
    <>
      {listData.map((e, idx) => {
        return (
          <MessageThread
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
