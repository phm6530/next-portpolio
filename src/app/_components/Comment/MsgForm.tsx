"use client";

import { ChangeEvent, useState } from "react";
import { useForm } from "react-hook-form";
import classes from "./Reply.module.scss";
import { useMutation } from "@tanstack/react-query";
import { withFetch } from "@/app/lib/helperClient";

export default function MsgForm() {
  const [rows, setRows] = useState(4);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const { mutate } = useMutation({
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
    onError: () => {
      console.log("error!");
    },
  });

  const submitHandler = (data: any) => {
    console.log("제출!");
    mutate({ ...data, templateId: 1 });
  };

  const test = Object.values(errors);
  const errorMessage = test[0]?.message;

  //rows 커스텀
  const rowsHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.currentTarget.value;
    const newLineCount = value.split("\n").length - 1;
    newLineCount > 4 ? setRows(newLineCount) : 4;
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)} className={classes.replyForm}>
      <input
        type="text"
        placeholder="이름"
        className={classes.input}
        autoComplete="off"
        {...register("name", {
          required: "이름은 필수입니다.",
          minLength: { value: 2, message: "이름은 최소 2글자로 설정해주세요" },
        })}
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
        autoComplete="off"
        className={classes.input}
      />

      <textarea
        className={classes.textArea}
        rows={rows}
        {...register("msg", {
          required: "남기실 말은 필수입니다.",
          onChange: rowsHandler,
          minLength: {
            value: 4,
            message: "최소 4글자 남겨주세요!",
          },
        })}
        placeholder="욕설이나 비하 댓글을 삭제 될 수 있습니다. 타인에게 상처주는 말은 하지 말아주세요!"
      />
      {typeof errorMessage === "string" ? (
        <div className={classes.errorBoundary}>{errorMessage}</div>
      ) : null}

      <button type="submit">제출</button>
    </form>
  );
}
