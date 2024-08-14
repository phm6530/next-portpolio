import { FormEvent } from "react";
import { useForm } from "react-hook-form";
import classes from "./Reply.module.scss";

export default function ReplyForm() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const submitHandler = (data: any) => {
    console.log("제출!!", data);
  };

  const test = Object.values(errors);
  const errorMessage = test[0]?.message;

  return (
    <form onSubmit={handleSubmit(submitHandler)} className={classes.replyForm}>
      <input
        type="text"
        placeholder="이름"
        className={classes.input}
        autoComplete="off"
        {...register("name", {
          required: "필수..",
          minLength: { value: 5, message: "최소 2글자" },
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
        rows={3}
        {...register("reply", { required: "필수.." })}
        placeholder="욕설이나 비하 댓글을 삭제 될 수 있습니다. 타인에게 상처주는 말은 하지 말아주세요!"
      />
      {typeof errorMessage === "string" ? (
        <div className={classes.errorBoundary}>{errorMessage}</div>
      ) : null}

      <button type="submit">제출입니다.</button>
    </form>
  );
}
