"use client";

import { FormProvider, useForm } from "react-hook-form";
import classes from "./CommentEditor.module.scss";
import FormInput from "@/components/ui/FormElement/FormInput";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import CommentTextArea from "@/components/Comment/CommentTextArea";
import { QUERY_KEY } from "@/types/constans";
import { useEffect } from "react";
import { User } from "@/types/auth.type";
import withAuthFetch from "@/utils/withAuthFetch";

//익명은 Password도 받음
type AnonymousDefaultValue = {
  anonymous: string; //닉네임
  password: string;
  content: string;
};

//로그인 유저는 ID만 받음
type AuthUserDefaultValue = {
  userId: number | null;
  content: string;
};

export default function CommentEditor({
  commentId,
  templateId,
  templateType,
}: {
  commentId?: string;
  templateId?: string;
  templateType?: string;
}) {
  const queryclient = useQueryClient();
  const userData = queryclient.getQueryData([QUERY_KEY.USER_DATA]) as User;

  const AnonymousValues: AnonymousDefaultValue = {
    anonymous: "",
    password: "",
    content: "",
  };

  const AuthUserValues: AuthUserDefaultValue = {
    userId: userData?.id ?? null,
    content: "",
  };

  const defaultValues = userData ? AuthUserValues : AnonymousValues;

  type DefaultValues<T> = T extends number
    ? AuthUserDefaultValue
    : AnonymousDefaultValue;

  const formMethod = useForm<DefaultValues<typeof userData>>({
    defaultValues,
  });

  //전역 인스턴스
  const queryClient = useQueryClient();
  const {
    reset,
    register,
    formState: { errors },
    handleSubmit,
  } = formMethod;

  useEffect(() => {
    reset(defaultValues);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const errorArr = Object.values(errors);
  const errorMessage = errorArr[0]?.message;

  const { mutate, isPending } = useMutation({
    mutationFn: async (data) => {
      const url = (() => {
        if (commentId) {
          return `reply/${commentId}`;
        } else if (!commentId) {
          return `comment/${templateType}/${templateId}`;
        } else {
          return null as never;
        }
      })();

      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      };

      return await withAuthFetch(url, options);
    },
    onSuccess: async () => {
      reset();
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.COMMENTS, templateId],
      });
    },
  });

  const submitHandler = (data: any) => {
    mutate({ ...data });
  };

  return (
    <form
      onSubmit={handleSubmit(submitHandler)}
      className={classes.commentForm}
    >
      <FormProvider {...formMethod}>
        <>
          {!userData && (
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
          )}
        </>

        <div className={classes.textareaWrap}>
          {/* OnChange 랜더링 방지하기위해 따로 분리함 */}
          <CommentTextArea name={"content"}>
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
