"use client";

import { FormProvider, useForm } from "react-hook-form";
import classes from "./CommentEditor.module.scss";
import FormInput from "@/components/ui/FormElement/FormInput";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { BASE_NEST_URL } from "@/config/base";

import CommentTextArea from "@/components/Comment/CommentTextArea";
import { QUERY_KEY } from "@/types/constans";
import requestHandler from "@/utils/withFetch";

export default function CommentEditor({
  commentId,
  templateId,
  templateType,
}: {
  commentId?: string;
  templateId?: string;
  templateType?: string;
}) {
  const formMethod = useForm();

  //전역 인스턴스
  const queryClient = useQueryClient();
  const {
    reset,
    register,
    formState: { errors },
    handleSubmit,
  } = formMethod;

  const errorArr = Object.values(errors);
  const errorMessage = errorArr[0]?.message;

  const isAnonymous = commentId;

  console.log(commentId);

  const { mutate, isPending } = useMutation({
    mutationFn: async (data) =>
      await requestHandler(() => {
        const url = () => {
          if (isAnonymous) {
            return `${BASE_NEST_URL}/reply/${commentId}`;
          } else if (!isAnonymous) {
            return `${BASE_NEST_URL}/comment/${templateType}/${templateId}`;
          } else {
            return null as never;
          }
        };
        return fetch(url(), {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
      }),
    onSuccess: async (data) => {
      reset();

      console.log("data", data);
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.COMMENTS, templateId],
      });
      // queryClient.set
    },
  });

  const submitHandler = (data: any) => {
    console.log(data);
    mutate({ ...data });
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
            {...register("anonymous", {
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
          <CommentTextArea name={isAnonymous ? "reply" : "comment"}>
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
