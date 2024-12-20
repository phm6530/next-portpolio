"use client";

import Button from "@/components/ui/button/Button";
import FormInput from "@/components/ui/FormElement/FormInput";
import { useMutation } from "@tanstack/react-query";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import classes from "./SignUpForm.module.scss";
import { useState } from "react";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import FormRegisterError from "@/components/Error/FormRegisterError";
import { BASE_NEST_URL } from "@/config/base";
import { useRouter } from "next/navigation";
import requestHandler from "@/utils/withFetch";
import { SignupUser } from "@/types/auth.type";
import InputWrapper from "@/components/ui/InputWrapper/InputWrapper";

//한글 검사
const nickNamezod = z
  .string()
  .min(2, "닉네임은 최소 2글자 이상이어야 합니다.")
  .max(15, "비밀번호는 최대 15글자 이하여야 합니다.")
  .regex(/^[가-힣a-zA-Z0-9]+$/, "올바른 닉네임 형식이 아닙니다.");

const schema = z.object({
  nickname: nickNamezod,
  password: z.string().min(4, "비밀번호는 최소 4글자 이상이어야 합니다."),
  email: z.string().email("유효한 이메일주소가 아닙니다."),
});

export default function SignUpForm() {
  const formMethod = useForm<SignupUser>({ resolver: zodResolver(schema) });
  const { register, handleSubmit } = formMethod;
  const router = useRouter();

  const { isPending, mutate: registerUserMutate } = useMutation<
    unknown,
    Error,
    SignupUser
  >({
    mutationFn: async (data) => {
      return requestHandler(async () => {
        return await fetch(`${BASE_NEST_URL}/auth/register`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
      });
    },
    onSuccess: () => {
      alert("회원가입 완료되었습니다.");
      router.replace("/auth/login");
    },
  });

  const onSubmitHandler = (data: SignupUser) => {
    registerUserMutate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmitHandler)} className={classes.form}>
      <FormProvider {...formMethod}>
        <InputWrapper title="닉네임">
          <FormInput
            placeholder="닉네임을 2글자 이상 입력해주세요."
            {...register("nickname")}
          />
        </InputWrapper>
        {/* <FormRegisterError /> */}

        <InputWrapper
          title="이메일"
          description="* 인증은 필요하지 않지만, 비밀번호 찾기 시 해당 이메일로 발송됩니다."
        >
          <FormInput
            type="text"
            placeholder="이메일을 입력해주세요. 예) example@example.com"
            {...register("email")}
            autoComplete="off"
            inputName="email"
          />
        </InputWrapper>

        <InputWrapper title="비밀번호">
          <FormInput
            type="password"
            placeholder="비밀번호를 설정해주세요."
            {...register("password")}
          />
        </InputWrapper>

        <Button.submit type={"submit"} disabled={isPending}>
          회원가입
        </Button.submit>
      </FormProvider>
    </form>
  );
}
