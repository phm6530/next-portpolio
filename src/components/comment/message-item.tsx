"use client";
import UserRoleDisplay from "@/components/ui/userRoleDisplay/UserRoleDisplay";
import dayjs from "dayjs";
import "dayjs/locale/ko";

import relativeTime from "dayjs/plugin/relativeTime";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEY, REQUEST_METHOD } from "@/types/constans";
import { CommentReponse, MSG_TYPE } from "@/types/comment.type";
import { User } from "@/types/auth.type";
import { useRouter } from "next/navigation";
import { X } from "lucide-react";
import { PsConfirmModal } from "../shared/modals/password-input-modal";
import { toast } from "react-toastify";
import useCommentContext from "./hook/comment-context-hook";
import ConfirmButton from "../ui/confirm-button";
import { withFetchRevaildationAction } from "@/utils/with-fetch-revaildation";

//import
dayjs.extend(relativeTime);
dayjs.locale("ko");

export default function MessageItem({
  id,
  createdAt,
  content,
  msgType,
  creator,
  onClickEvent,
  boardId,
}: {
  msgType: MSG_TYPE;
  parentId?: number;
  onClickEvent?: () => void;
  boardId: string;
} & Omit<CommentReponse, "replies">) {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { EDITOR_PATH } = useCommentContext();

  const userData: User | null =
    queryClient.getQueryData([QUERY_KEY.USER_DATA]) ?? null;

  const { mutateAsync } = useMutation({
    mutationFn: async (data?: { password?: string }) => {
      const result = await withFetchRevaildationAction({
        endPoint: `${msgType}/${id}`,
        requireAuth: !!userData,
        tags: [`comment-${EDITOR_PATH}-${boardId}`],
        options: {
          method: REQUEST_METHOD.DELETE,
          ...(!userData
            ? { body: JSON.stringify({ password: data!.password }) }
            : {}),
        },
      });

      if (!result.success) {
        throw new Error(result.message);
      }

      return result;
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
      <div className="flex flex-col w-full  items-start animate-fadein ">
        <div className="flex items-center justify-start mb-2 gap-2">
          {/* 유저 or 익명 */}
          <UserRoleDisplay role={creator.role} nickname={creator.nickname} />

          {/* 내 댓글일 경우만 삭제버튼 노출 */}
          {isUserCommentAuthor && (
            <>
              {isUserCommentAuthor && (
                <>
                  <span className="text-[10px] mr-5 mt-0.5 text-pink-300  rounded-full">
                    내 댓글
                  </span>
                  <ConfirmButton
                    title="질문을 삭제하시겠습니까?"
                    cb={async (e) => {
                      await mutateAsync(e);
                    }}
                  >
                    <button
                      className=" opacity-70
            "
                    >
                      <X className="w-3 h-3 text-secondary-foreground/80" />
                    </button>
                  </ConfirmButton>
                </>
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
                className=" opacity-70
            "
              >
                <X className="w-3 h-3 text-secondary-foreground/80" />
              </button>
            </PsConfirmModal>
          )}
        </div>

        <div
          className="bg-secondary/40 dark:bg-card leading-5 text-sm dark:border-white/20 hover:bg-secondary/70 text-[15px] min-w-[50px] border border-input py-3 px-4 rounded-full cursor-pointer dark:hover:brightness-125  "
          onClick={onClickEvent}
        >
          {content}
        </div>
      </div>
    </>
  );
}
