"use client";

import { FormProvider, useForm } from "react-hook-form";
import classes from "./CommentEditor.module.scss";
import FormInput from "@/components/ui/FormElement/FormInput";
import { useMutation } from "@tanstack/react-query";
import { withFetch } from "@/util/clientUtil";
import { BASE_NEST_URL } from "@/config/base";
import { queryClient } from "@/config/queryClient";
import { MessageProps } from "@/components/Comment/CommentSection";
import CommentTextArea from "@/components/Comment/CommentTextArea";

export default function CommentEditor({ id }: { id: string }) {
  const formMethod = useForm();
  const {
    reset,
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = formMethod;

  const errorArr = Object.values(errors);
  const errorMessage = errorArr[0]?.message;

  const { mutate, isPending } = useMutation({
    mutationFn: (data) =>
      withFetch(async () => {
        return fetch(`${BASE_NEST_URL}/api/comment`, {
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
        queryKey: ["comment"],
        queryFn: () =>
          withFetch<MessageProps[]>(async () => {
            return fetch(`${BASE_NEST_URL}/api/comment?templateId=${id}`, {
              cache: "force-cache",
            });
          }),
      });
    },
  });

  const submitHandler = (data: any) => {
    if (id) {
      mutate({ ...data, id, type: "comment" });
    } else if (id) {
      mutate({ ...data, id, type: "reply" });
    } else {
      return 0 as never;
    }
  };

  return (
    <form
      onSubmit={handleSubmit(submitHandler)}
      className={classes.commentForm}
    >
      <FormProvider {...formMethod}>
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
