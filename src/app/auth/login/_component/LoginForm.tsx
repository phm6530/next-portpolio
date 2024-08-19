"use client";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { signIn } from "next-auth/react";

import classes from "./login.module.scss";

type LoginFormProps = {
  user_id: string;
  user_password: string;
};

export default function LoginForm({
  redirectPath = "/",
}: {
  redirectPath: string;
}) {
  const { mutate, isPending } = useMutation({
    mutationFn: async (data: LoginFormProps) => {
      const result = await signIn("credentials", {
        redirect: false,
        user_id: data.user_id,
        user_password: data.user_password,
      });

      if (result?.error) {
        throw new Error(
          "존재하지 않는 회원이거나 패스워드가 일치하지 않습니다."
        );
      }
      return result;
    },
    onSuccess: () => {
      window.location.href = redirectPath;
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormProps>();

  const onSubmitHandler = async (data: LoginFormProps) => {
    mutate(data);
  };

  const errorMessages = Object.values(errors);
  const firstErrorMeg = errorMessages[0]?.message;

  return (
    <>
      <form onSubmit={handleSubmit(onSubmitHandler)}>
        <label>
          Username:
          <input
            type="text"
            {...register("user_id", { required: "아이디는 필수 입니다." })}
            autoComplete="off"
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            {...register("user_password", {
              required: "비밀번호는 필수 입니다.",
            })}
            autoComplete="new-password"
          />
        </label>
        <br />
        <button type="submit" disabled={isPending}>
          Login
        </button>
        {firstErrorMeg && (
          <div className={classes.errorMsg}>{firstErrorMeg}</div>
        )}
      </form>
    </>
  );
}
