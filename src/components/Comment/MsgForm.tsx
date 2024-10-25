"use client";

import classes from "./Msg.module.scss";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { withFetch } from "@/util/clientUtil";
import { queryClient } from "@/config/queryClient";
import { useSession } from "next-auth/react";
import CommentTextArea from "@/components/Comment/CommentTextArea";
import { BASE_URL } from "@/config/base";
import FormInput from "@/components/ui/FormElement/FormInput";
import { MessageProps } from "@/components/Comment/CommentSection";

export default function MsgForm({
  template_id,
  comment_id,
}: {
  template_id?: number;
  comment_id?: number;
}) {
  const { data: session } = useSession();

  const formMethod = useForm();
  const {
    reset,
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = formMethod;

  const { mutate, isPending } = useMutation({
    mutationFn: (data) =>
      withFetch(async () => {
        return fetch(`${BASE_URL}/api/comment`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
      }),
    onSuccess: async () => {
      reset(); //폼 초기화
      await queryClient.prefetchQuery({
        queryKey: ["comment", template_id],
        queryFn: () =>
          withFetch<MessageProps[]>(async () => {
            return fetch(`${BASE_URL}/api/comment?templateId=${template_id}`, {
              cache: "force-cache",
            });
          }),
      });
    },
  });

  const submitHandler = (data: any) => {
    if (template_id) {
      mutate({ ...data, template_id, type: "comment" });
    } else if (comment_id) {
      mutate({ ...data, comment_id, type: "reply" });
    } else {
      return 0 as never;
    }
  };

  //에러 메세지
  const errorArr = Object.values(errors);
  const errorMessage = errorArr[0]?.message;

  const anonymous = session?.user.role === "anonymous";

  useEffect(() => {
    if (anonymous) {
      setValue("name", "작성자");
    }
  }, [anonymous, setValue]);

  return (
    <form onSubmit={handleSubmit(submitHandler)} className={classes.replyForm}>
      <FormProvider {...formMethod}>
        {session?.user.role === "admin" ? (
          session?.user.user_id
        ) : (
          <>
            <FormInput
              type="text"
              placeholder="이름"
              autoComplete="off"
              {...register("name", {
                required: "이름은 필수입니다.",
                minLength: {
                  value: 2,
                  message: "이름은 최소 2글자로 설정해주세요",
                },
              })}
              readOnly={anonymous}
            />
            <FormInput
              type="password"
              {...register("password", {
                required: "비밀번호는 필수입니다.",
                minLength: {
                  value: 4,
                  message: "비밀번호는 최소 4글자로 설정해주세요",
                },
              })}
              placeholder="password"
              autoComplete="new-password"
            />
          </>
        )}
        <div className={classes.textareaWrap}>
          {/* OnChange 랜더링 방지하기위해 따로 분리함 */}

          <CommentTextArea name={"msg"}>
            <div className={classes.errorDiv}>
              {typeof errorMessage === "string" ? `! ${errorMessage}` : null}
            </div>
          </CommentTextArea>

          <button type="submit" disabled={isPending}>
            댓글 작성
          </button>
        </div>
      </FormProvider>
    </form>
  );
}
