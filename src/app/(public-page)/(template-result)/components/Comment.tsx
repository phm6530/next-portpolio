"use client";
import UserRoleDisplay from "@/components/layout/userRoleDisplay/UserRoleDisplay";
import classes from "./Comment.module.scss";
import Button from "@/components/ui/button/Button";
import dayjs from "dayjs";
import "dayjs/locale/ko";

import relativeTime from "dayjs/plugin/relativeTime";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEY } from "@/types/constans";
import { COMMENT_NEED_PATH, CommentReponse } from "@/types/comment.type";
import { User } from "@/types/auth.type";
import withAuthFetch from "@/utils/withAuthFetch";
import usePopup from "@/app/hook/usePopup";
import DeleteItemForm from "@/components/DeleteItemForm";
import revaildateTags from "@/lib/revaildateTags";
import { useRouter } from "next/navigation";

//import
dayjs.extend(relativeTime);
dayjs.locale("ko");

export default function Comment({
  contentType,
  parentId,
  id,
  createAt,
  content,
  user,
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

  const userData: User | null =
    queryClient.getQueryData([QUERY_KEY.USER_DATA]) ?? null;

  const { isOpen, openModal, closeModal, PopupComponent } = usePopup();

  const { mutate, isPending } = useMutation({
    mutationFn: async (data?: string) => {
      //userData가 있으면 로그인상태
      const url = `${contentType}/${id}`;

      let options: RequestInit = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },

        ...(!!userData
          ? { credentials: "include" }
          : {
              body: JSON.stringify({ password: data }),
            }),
      };

      await withAuthFetch(url, options);
      await revaildateTags({
        tags: [`comment-${COMMENT_NEED_PATH.BOARD}-${boardId}`],
      });
    },
    onSuccess: () => {
      alert("댓글이 삭제되었습니다.");
      router.refresh();
    },
    onError: (data) => {
      alert(data.message);
    },
  });

  const deleteMessage = () => {
    if (userData) {
      //권한있을경우 권한만 체크하기위해서 password 제외
      if (confirm("삭제하시겠습니까?")) {
        mutate(undefined);
      } else {
        return null;
      }
    } else {
      openModal();
      // const msgPassword = prompt("비밀번호를 입력해주세요!!");
      // if (msgPassword) {
      //   mutate(msgPassword);
      // }
    }
  };

  const isUserCommentAuthor = !!(
    creator?.email &&
    userData?.email &&
    creator.email === userData.email
  );

  return (
    <>
      <PopupComponent isOpen={isOpen} closeModal={closeModal}>
        <DeleteItemForm action={mutate} isPending={isPending} />
      </PopupComponent>

      <div className={classes.commentContainer}>
        <div className={classes.commentSurmmry}>
          {/* 유저 or 익명 */}
          <UserRoleDisplay role={creator.role} nickname={creator.nickname} />

          <span style={{ marginRight: "10px" }}>
            {dayjs(createAt).fromNow()}
          </span>

          {/* 내 댓글일 경우만 삭제버튼 노출 */}
          {isUserCommentAuthor && (
            <>
              {isUserCommentAuthor && (
                <span className={classes.myComment}>내 댓글</span>
              )}
              <div className={classes.btnWRapper}>
                <Button.closeBtn onClick={deleteMessage} />
              </div>
            </>
          )}

          {!userData && creator.role === "anonymous" && (
            <div className={classes.btnWRapper}>
              <Button.closeBtn onClick={deleteMessage} />
            </div>
          )}
        </div>
        <div className={classes.comment} onClick={onClickEvent}>
          {content}
        </div>
      </div>
    </>
  );
}
