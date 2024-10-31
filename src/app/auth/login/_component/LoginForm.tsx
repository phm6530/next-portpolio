"use client";
import { FormProvider, useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { SignIn, USER_ROLE } from "@/types/auth.type";
import classes from "./login.module.scss";
import FormInput from "@/components/ui/FormElement/FormInput";
import Button from "@/components/ui/button/Button";
import requestHandler from "@/utils/withFetch";
import { BASE_NEST_URL } from "@/config/base";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import useStore from "@/store/store";
import { TokenLocalStorage } from "@/utils/localstorage-token";

type SignUpResponse = {
  accessToken: string;
  user: {
    createAt: string;
    email: string;
    id: 1;
    nickname: string;
    role: USER_ROLE;
  };
};

const schema = z.object({
  password: z.string().min(4, "비밀번호는 최소 4글자 이상이어야 합니다."),
  email: z.string().email("올바른 이메일주소 형식이 아닙니다."),
});

export default function LoginForm() {
  const store = useStore();

  const {
    mutate: signUpMutate,
    isPending,
    error,
  } = useMutation({
    mutationFn: async (data: SignIn) => {
      return await requestHandler<SignUpResponse>(async () => {
        return await fetch(`${BASE_NEST_URL}/auth/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
          credentials: "include", // AccessToken
          // credentials: "include",
          //브라우저가 서버와의 요청에서 쿠키를 포함할지 여부를 결정하는 옵션
        });
      });
    },
    onSuccess: (data) => {
      //초기 로그인 시에 사용자 정보 + 토큰 반영
      // TokenLocalStorage.setAccessToken(data.accessToken);

      const { nickname, email, role } = data.user;

      store.setAuthUser({
        nickname,
        email,
        role,
      });
    },
  });

  //zodResolver
  const method = useForm<SignIn>({
    resolver: zodResolver(schema),
  });

  //제출
  const onSubmitHandler = (data: SignIn) => {
    console.log(data);
    signUpMutate(data);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = method;

  const errorMessages = Object.values(errors);
  const firstErrorMeg = errorMessages[0]?.message;

  return (
    <>
      <form onSubmit={handleSubmit(onSubmitHandler)} className={classes.form}>
        <FormProvider {...method}>
          {/* Id */}
          <FormInput
            type="text"
            placeholder="아이디"
            {...register("email")}
            autoComplete="off"
            inputName="email"
          />

          {/* Password */}
          <FormInput
            type="password"
            placeholder="비밀번호"
            {...register("password")}
            autoComplete="new-password"
            inputName="password"
          />

          <Button.submit disabled={isPending}>로그인</Button.submit>

          {error && <div className={classes.errorMsg}>{error.message}</div>}
        </FormProvider>
      </form>
    </>
  );
}
