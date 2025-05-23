"use client";

import { FormProvider, useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEY, REQUEST_METHOD } from "@/types/constans";
import { Dispatch, SetStateAction, useEffect } from "react";
import { User } from "@/types/auth.type";
import { MSG_TYPE } from "@/types/comment.type";
import { useParams, useRouter } from "next/navigation";
import { CategoriesKey } from "@/types/board";
import InputField from "@/components/shared/inputs/input-field";
import PasswordInputField from "@/components/shared/inputs/input-password-field";
import TextareaFormField from "@/components/ui/FormElement/textarea-form-field";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import useCommentContext from "./hook/comment-context-hook";
import { UserMsgSchema, geustMsgSchema } from "./schema/message-schema";
import { toast } from "react-toastify";
import UserRoleDisplay from "../ui/userRoleDisplay/UserRoleDisplay";
import { cn } from "@/lib/utils";
import LoadingSpinnerWrapper from "../ui/loading/LoadingSpinnerWrapper";
import { withFetchRevaildationAction } from "@/utils/with-fetch-revaildation";
import withActionAtClient from "@/utils/with-action-at-client";
import useThrottling from "@/_hook/useThrottlring";

/**
 * Editor Type = Comment / Reply 유니온
 * Comment Id = Reply가 의존
 * parentType , parentId = Comment Id가 의존
 */
export default function MessageForm({
  parentsId,
  commentId,
  EDITOR_MODE,
  setTouch,
  category,
}: {
  parentsId?: string;
  setTouch?: Dispatch<SetStateAction<number | null>>;
  commentId?: number;
  EDITOR_MODE: MSG_TYPE;
  category?: CategoriesKey;
}) {
  const queryclient = useQueryClient();
  const userData = queryclient.getQueryData([QUERY_KEY.USER_DATA]) as User;
  const { EDITOR_PATH } = useCommentContext();

  const { throttle } = useThrottling();
  const params = useParams();
  const router = useRouter();

  const dynamicSchema = !!userData ? UserMsgSchema : geustMsgSchema;

  const formMethod = useForm<z.infer<typeof dynamicSchema>>({
    defaultValues: {
      content: "",
      ...(!!userData
        ? {
            userId: userData.id,
          }
        : {
            password: "",
            anonymous: "",
          }),
    },
    resolver: zodResolver(dynamicSchema),
  });

  const errors = Object.values(formMethod.formState.errors) ?? [];

  //전역 인스턴스
  const { reset, handleSubmit, watch } = formMethod;

  useEffect(() => {
    reset();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { mutate, isPending } = useMutation({
    mutationFn: async (data) => {
      // 분기 Url 생성..
      const endPoint = (() => {
        switch (EDITOR_MODE) {
          case MSG_TYPE.COMMENT:
            return `comment/${EDITOR_PATH}/${parentsId}`;
          case MSG_TYPE.REPLY:
            return `reply/${commentId}`;
          default:
            return null as never;
        }
      })();

      const result = await withActionAtClient(async () =>
        withFetchRevaildationAction({
          endPoint,
          options: {
            method: REQUEST_METHOD.POST,
            body: JSON.stringify(data),
          },
          requireAuth: true,
          tags: [
            `comment-${EDITOR_PATH}-${params.id}`,
            ...(category ? [`${EDITOR_PATH}-${category}`] : []),
          ],
        })
      );

      return result;
    },
    onSuccess: async () => {
      toast.success("댓글을 작성하였습니다.");
      reset();
      router.refresh();

      // idx View Close
      if (setTouch) {
        setTouch(null); //답글창 닫기
      }
    },
  });

  const submitHandler = (data: any) => {
    throttle(() => mutate({ ...data }), 1500);
  };

  return (
    <LoadingSpinnerWrapper loading={isPending}>
      <FormProvider {...formMethod}>
        <form
          onSubmit={handleSubmit(submitHandler)}
          className={cn(
            "flex flex-col md:grid md:grid-cols-[repeat(6,1fr)]  gap-2 rounded-xl",
            !!userData && "p-2 bg-card"
          )}
        >
          {/* 로그인 한 유저는 필요없음  */}
          {!userData ? (
            <>
              <div className="col-span-2">
                <InputField
                  errorField={false}
                  autoComplete="off"
                  name="anonymous"
                  placeholder="이름"
                  disabled={isPending}
                />
              </div>
              <div className="col-span-2">
                <PasswordInputField
                  errorField={false}
                  disabled={isPending}
                  placeholder="비밀번호"
                />
              </div>
            </>
          ) : (
            <div className="col-span-6 0 text-left flex items-start  p-4 border">
              <UserRoleDisplay
                role={userData.role}
                nickname={userData.nickname}
              />
            </div>
          )}
          <div className="col-span-5">
            <TextareaFormField
              name={"content"}
              placeholder="남기실 메세지를 입력해주세요"
              maxLength={1000}
              disabled={isPending}
            />
          </div>
          <Button
            disabled={isPending}
            className="mt-3 md:mt-0 col-span-6  md:col-span-1 h-full order-2 md:order-none py-5"
          >
            댓글 작성
          </Button>
          <div className="pt-2 text-sm flex gap-3 col-span-6 order-1 md:order-none">
            <span className="text-[11px] opacity-45">
              {watch("content").length} / 1000 자
            </span>

            <span className="text-destructive"> {errors[0]?.message}</span>
          </div>
        </form>
      </FormProvider>
    </LoadingSpinnerWrapper>
  );
}
