"use client";
import UserRoleDisplay from "@/components/layout/userRoleDisplay/UserRoleDisplay";
import classes from "./Comment.module.scss";

import dayjs from "dayjs";
import "dayjs/locale/ko";

import relativeTime from "dayjs/plugin/relativeTime";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEY } from "@/types/constans";
import { COMMENT_NEED_PATH, CommentReponse } from "@/types/comment.type";
import { User } from "@/types/auth.type";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { CandlestickChart, DeleteIcon, LucideDelete, X } from "lucide-react";
import { PsConfirmModal } from "../shared/modals/password-input-modal";
import { revaildateTags } from "@/action/revaildate";
import { toast } from "react-toastify";
import DeleteItemForm from "../DeleteItemForm";
import MessageDeleteAction from "./action/delete-action";
import { BASE_NEST_URL } from "@/config/base";
import useCommentContext from "./hook/comment-context-hook";

//import
dayjs.extend(relativeTime);
dayjs.locale("ko");

export default function MessageItem({
  id,
  createdAt,
  content,
  creator,
  onClickEvent,
  boardId,
}: {
  contentType: "reply" | "comment";
  parentId?: number;
  onClickEvent?: () => void;
  boardId: string;
} & Omit<CommentReponse, "replies">) {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { EDITOR_MODE, EDITOR_PATH } = useCommentContext();

  const userData: User | null =
    queryClient.getQueryData([QUERY_KEY.USER_DATA]) ?? null;

  const { mutateAsync } = useMutation({
    mutationFn: async (data?: { password: string }) => {
      const url = `${BASE_NEST_URL}/${EDITOR_MODE}/${id}`;
      return await MessageDeleteAction({
        url,
        isMember: !!userData,
        tags: [`comment-${EDITOR_PATH}-${boardId}`],
        password: data!.password,
      });
    },
    onSuccess: () => {
      toast.success("댓글이 삭제되었습니다.");
      router.refresh();
    },
  });

  const isUserCommentAuthor = !!(
    creator?.email &&
    userData?.email &&
    creator.email === userData.email
  );

  return (
    <>
      <div className="flex flex-col w-full  items-start ">
        <div className="flex items-center justify-start mb-3 gap-2">
          {/* 유저 or 익명 */}
          <UserRoleDisplay role={creator.role} nickname={creator.nickname} />

          {/* 내 댓글일 경우만 삭제버튼 노출 */}
          {isUserCommentAuthor && (
            <>
              {isUserCommentAuthor && (
                <span className="text-[10px] mr-5 text-primary border-primary/50 border  py-1 px-2 rounded-full">
                  내 댓글
                </span>
              )}
            </>
          )}

          <span className="text-[12px] text-muted-foreground">
            {dayjs(createdAt).fromNow()}
          </span>

          {!userData && creator.role === "anonymous" && (
            <PsConfirmModal
              cb={async (e) => {
                await mutateAsync(e);
              }}
            >
              <button
                className="border
            "
              >
                <X className="w-3 h-3 text-secondary-foreground" />
              </button>
            </PsConfirmModal>
          )}
        </div>

        <div
          className="bg-secondary/40 dark:bg-card dark:border-white/20 hover:bg-secondary/70 text-[15px] min-w-[50px] border border-input py-3 px-4 rounded-full cursor-pointer dark:hover:brightness-125  "
          onClick={onClickEvent}
        >
          {content}
        </div>
      </div>
    </>
  );
}
