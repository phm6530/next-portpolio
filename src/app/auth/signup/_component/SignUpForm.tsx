"use client";

import Button from "@/components/ui/button/Button";
import FormInput from "@/components/ui/FormElement/FormInput";
import { useMutation } from "@tanstack/react-query";
import { FormProvider, useForm } from "react-hook-form";
import classes from "./SignUpForm.module.scss";
import { useEffect, useState } from "react";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const nickNamezod = z.string().min(3, "닉네임은 최소 3글자 이상이어야 합니다.");

const schema = z.object({
  nickname: nickNamezod,
  password: z.string().min(4, "비밀번호는 최소 4글자 이상이어야 합니다."),
  userEmail: z.string().email("유효한 이메일주소가 아닙니다."),
});

export default function SignUpForm() {
  const [isNicknameVaild, setIsNickanemVaild] = useState<null | boolean>(null);
  const formMethod = useForm({ resolver: zodResolver(schema) });
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = formMethod;

  console.log(isValid);
  console.log(errors);

  const test = ["닉네임"];

  const { isPending } = useMutation({});

  const { mutate } = useMutation({
    mutationFn: async () => {},
  });

  const onSubmitHandler = () => {};

  useEffect(() => {
    // 디바운싱
    const debounce = setTimeout(() => {
      const nickname = watch("nickname");
      const isNicknameValid = nickNamezod.safeParse(nickname);
      if (!isNicknameValid.success) return;
      const trues = !test.includes(nickname);
      trues && setIsNickanemVaild(true);
    }, 500);

    return () => {
      //정리해버리기
      console.log("정리함");
      clearTimeout(debounce);
    };
  }, [watch("nickname")]);

  return (
    <form onSubmit={handleSubmit(onSubmitHandler)} className={classes.form}>
      <FormProvider {...formMethod}>
        <FormInput
          type="text"
          placeholder="닉네임"
          {...register("nickname")}
          autoComplete="off"
          inputName="nickname"
        />
        {isNicknameVaild ?? "없음"}
        {isNicknameVaild === true && "사용가능한 닉네임"}
        {isNicknameVaild === false && "중복된 닉네임"}

        <FormInput
          type="text"
          placeholder="이메일"
          {...register("userEmail")}
          autoComplete="off"
          inputName="userEmail"
        />
        <FormInput
          type="password"
          placeholder="비밀번호"
          {...register("password")}
          inputName="password"
        />
        <Button.submit disabled={isPending}>회원가입</Button.submit>
      </FormProvider>
    </form>
  );
}
