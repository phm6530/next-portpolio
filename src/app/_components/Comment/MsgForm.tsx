"use client";

import classes from "./Msg.module.scss";
import { ChangeEvent, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { withFetch } from "@/app/lib/helperClient";
import { queryClient } from "@/app/config/queryClient";
import { useSession } from "next-auth/react";

export default function MsgForm({
  template_id,
  comment_id,
}: {
  template_id?: number;
  comment_id?: number;
}) {
  const [rows, setRows] = useState(4);

  const { data: session } = useSession();

  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
    reset,
  } = useForm();

  const { mutate, isPending } = useMutation({
    mutationFn: (data) =>
      withFetch(async () => {
        return fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/comment`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
      }),
    onSuccess: () => {
      reset(); //폼 초기화

      queryClient.invalidateQueries({
        queryKey: ["comment"],
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

  //rows 커스텀
  const rowsHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.currentTarget.value;
    const newLineCount = value.split("\n").length - 1;
    newLineCount > 4 ? setRows(newLineCount) : 4;
  };

  const anonymous = session?.user.role === "anonymous";
  useEffect(() => {
    if (anonymous) {
      setValue("name", "작성자");
    }
  }, [anonymous, setValue]);

  console.log(errorMessage);

  return (
    <form onSubmit={handleSubmit(submitHandler)} className={classes.replyForm}>
      {session?.user.role === "admin" ? (
        session?.user.user_id
      ) : (
        <>
          <input
            type="text"
            placeholder="이름"
            className={classes.input}
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
          <input
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
            className={classes.input}
          />
        </>
      )}
      <div className={classes.textareaWrap}>
        <textarea
          rows={rows}
          {...register("msg", {
            required: "남기실 말은 필수입니다.",
            onChange: rowsHandler,
            minLength: {
              value: 4,
              message: "최소 4글자 남겨주세요!",
            },
          })}
          placeholder="댓글을 입력해주세요! 욕설이나 비하 댓글을 삭제 될 수 있습니다. 타인에게 상처주는 말은 하지 말아주세요!"
        />
        <div className={classes.errorBoundary}>
          {typeof errorMessage === "string" ? `! ${errorMessage}` : null}
        </div>
        <button type="submit" disabled={isPending}>
          댓글 작성
        </button>
      </div>{" "}
    </form>
  );
}
