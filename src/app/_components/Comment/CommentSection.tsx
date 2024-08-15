"use client";

import MsgForm from "@/app/_components/Comment/MsgForm";
import { userProps } from "@/types/user";
import classes from "./Reply.module.scss";
import CommentContainer from "@/app/_components/Comment/CommentContainer";
import { withFetch } from "@/app/lib/helperClient";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export type MessageProps = {
  id: number;
  msg: string;
  user: Required<userProps>;
  create_at: string;
  reply: Omit<MessageProps, "reply">[];
};

export default function CommentSection({ templateId }: { templateId: number }) {
  const [replyIdx, setReplyIdx] = useState<number | null>(null);
  const { data, isError } = useQuery({
    queryKey: ["Comment"],
    queryFn: () =>
      withFetch<MessageProps[]>(async () => {
        return fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/comment?templateId=${templateId}`
        );
      }),
    staleTime: 10000,
  });

  if (isError) {
    return "Error!!";
  }

  if (data) {
    return (
      <>
        {/* Reply */}
        <h1>댓글 {data.length} 개</h1>

        {/* Msg - Form */}
        <MsgForm />

        {data.length > 0
          ? data.map((comment, CommentIdx) => {
              return (
                <div
                  className={classes.commentContainer}
                  key={`comment-${CommentIdx}`}
                >
                  {/* Comment */}
                  <CommentContainer
                    comment={comment}
                    CommentIdx={CommentIdx}
                    replyIdx={replyIdx}
                    setReplyIdx={setReplyIdx}
                  />
                </div>
              );
            })
          : "댓글이 없습니다"}
      </>
    );
  }
}