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
import { useRouter } from "next/navigation";
import LoadingSpinnerWrapper from "@/components/loading/LoadingSpinnerWrapper";
import { Input } from "@/components/ui/input";
import PasswordInput from "@/components/ui/password-input";

type SignUpResponse = {
  accessToken: string;
  user: User;
};

const schema = z.object({
  password: z.string().min(4, "비밀번호는 최소 4글자 이상이어야 합니다."),
  email: z.string().email("올바른 이메일주소 형식이 아닙니다."),
});

export default function LoginForm() {
  const router = useRouter();
  //zodResolver
  const method = useForm<SignIn>({ resolver: zodResolver(schema) });

  const {
    mutate: signUpMutate,
    isPending,
    isSuccess,
    error,
  } = useMutation({
    mutationFn: async (data: SignIn) => {
      return await requestHandler<SignUpResponse>(async () => {
        // await new Promise((resolve) => setTimeout(resolve, 3000));
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
    onError: () => {
      // 미 일치시 Password 지워 버림
      method.reset({ password: "" });
    },
  });

  //제출
  const onSubmitHandler = (data: SignIn) => {
    console.log(data);
    signUpMutate(data);
  };

  const { register, handleSubmit } = method;

  const loadingStatus = isPending || isSuccess;

  // const loadingStatus = true;
  return (
    <LoadingSpinnerWrapper loading={loadingStatus}>
      <form
        onSubmit={handleSubmit(onSubmitHandler)}
        className={`${classes.form} ${
          loadingStatus ? classes.loading : undefined
        }`}
      >
        <FormProvider {...method}>
          {/* Id */}
          <div className={classes.inputWrapper}>
            <PasswordInput />
            <FormInput
              type="text"
              disabled={isPending || isSuccess}
              placeholder="아이디를 입력해주세요"
              {...register("email")}
              autoComplete="off"
              inputName="email"
            />

            {/* Password */}
            <FormInput
              type="password"
              disabled={isPending || isSuccess}
              placeholder="비밀번호를 입력해주세요"
              {...register("password")}
              autoComplete="new-password"
              inputName="password"
            />
          </div>

          <Button.submit disabled={isPending || isSuccess}>
            로그인
          </Button.submit>

          <div className={classes.passwordRecovery}>
            <button type="button" onClick={() => router.push("/auth/pin")}>
              비밀번호를 잊어버리셨나요?
            </button>
            |
            <button type="button" onClick={() => router.push("/auth/signup")}>
              회원가입
            </button>
          </div>
          {error && <div className={classes.errorMsg}>{error.message}</div>}
        </FormProvider>
      </form>
    </LoadingSpinnerWrapper>
  );
}
