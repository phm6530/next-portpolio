"use client";
import { FormProvider, useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { SignIn, User } from "@/types/auth.type";
import classes from "./login.module.scss";
import FormInput from "@/components/ui/FormElement/FormInput";
import Button from "@/components/ui/button/Button";
import requestHandler from "@/utils/withFetch";
import { BASE_NEST_URL } from "@/config/base";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import useStore from "@/store/store";
import { useRouter } from "next/navigation";

type SignUpResponse = {
  accessToken: string;
  user: User;
};

const schema = z.object({
  password: z
    .string()
    .min(4, "비밀번호는 최소 4글자 이상이어야 합니다."),
  email: z.string().email("올바른 이메일주소 형식이 아닙니다."),
});

export default function LoginForm() {
  const router = useRouter();

  const {
    mutate: signUpMutate,
    isPending,
    error,
  } = useMutation({
    mutationFn: async (data: SignIn) => {
      return await requestHandler<SignUpResponse>(async () => {
        return await fetch(`${BASE_NEST_URL}/auth/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
          credentials: "include", // Client만 가능하다이거 AccessToken
        });
      });
    },
    onSuccess: (data) => {
      //초기 로그인 시에 사용자 정보 + 토큰 반영
      const { nickname, email, role, id } = data.user;
      router.refresh();
    },
  });

  //zodResolver
  const method = useForm<SignIn>({ resolver: zodResolver(schema) });

  //제출
  const onSubmitHandler = (data: SignIn) => {
    console.log(data);
    signUpMutate(data);
  };

  const {
    register,
    handleSubmit,
    // formState: { errors },
  } = method;

  // const errorMessages = Object.values(errors);
  // const firstErrorMeg = errorMessages[0]?.message;

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmitHandler)}
        className={classes.form}
      >
        <FormProvider {...method}>
          {/* Id */}
          <div className={classes.inputWrapper}>
            <FormInput
              type="text"
              placeholder="아이디를 입력해주세요"
              {...register("email")}
              autoComplete="off"
              inputName="email"
            />

            {/* Password */}
            <FormInput
              type="password"
              placeholder="비밀번호를 입력해주세요"
              {...register("password")}
              autoComplete="new-password"
              inputName="password"
            />
          </div>

          <Button.submit disabled={isPending}>로그인</Button.submit>

          <div className={classes.passwordRecovery}>
            <button
              type="button"
              onClick={() => router.push("/auth/pin")}
            >
              비밀번호를 잊어버리셨나요?
            </button>
            |
            <button
              type="button"
              onClick={() => router.push("/auth/signup")}
            >
              회원가입
            </button>
          </div>
          {error && (
            <div className={classes.errorMsg}>{error.message}</div>
          )}
        </FormProvider>
      </form>
    </>
  );
}
