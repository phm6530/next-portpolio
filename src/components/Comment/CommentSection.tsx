"use client";

import MsgForm from "@/components/Comment/MsgForm";
import classes from "./Msg.module.scss";
import CommentContainer from "@/components/Comment/CommentContainer";

import { userProps } from "@/types/user";
import { withFetch } from "@/util/clientUtil";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import NotFoundComponent from "@/components/NotFoundComponent";
import { BASE_URL } from "@/config/base";

export type MessageProps = {
  //각 Id로 분기처리
  comment_id?: number;
  reply_id?: number;

  msg: string;
  user: Required<userProps>;
  create_at: string;
  reply: Omit<MessageProps, "reply">[];
};

export default function CommentSection({ templateId }: { templateId: number }) {
  const [replyIdx, setReplyIdx] = useState<number | null>(null);
  const { data, isError, isLoading } = useQuery<MessageProps[]>({
    queryKey: ["comment", templateId],
    queryFn: () =>
      withFetch<MessageProps[]>(async () => {
        return fetch(`${BASE_URL}/api/comment?templateId=${templateId}`, {
          cache: "no-cache",
        });
      }),
    staleTime: 10000,
    enabled: !!templateId,
  });

  if (isError) {
    return "Error!!";
  }
  if (isLoading) {
    return "loading...";
  }

  if (data) {
    return (
      <>
        {/* Reply */}
        <div className={classes.replyCount}>
          댓글 <span>{data.length}</span> 개
        </div>

        {/* Msg - Form */}
        <MsgForm template_id={templateId} />

        {data.length > 0 ? (
          data.map((comment, CommentIdx) => {
            return (
              <div
                className={classes.commentContainer}
                key={`comment-${CommentIdx}`}
              >
                {/* Comment */}
                <CommentContainer
                  comment_id={comment.comment_id}
                  comment={comment}
                  commentIdx={CommentIdx}
                  replyIdx={replyIdx}
                  setReplyIdx={setReplyIdx}
                />
              </div>
            );
          })
        ) : (
          // 댓글 없을때
          <NotFoundComponent.reply />
        )}
      </>
    );
  }
}
