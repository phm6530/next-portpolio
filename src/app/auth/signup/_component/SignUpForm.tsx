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

//한글 검사
const nickNamezod = z
  .string()
  .min(2, "닉네임은 최소 2글자 이상이어야 합니다.")
  .regex(/^[가-힣a-zA-Z0-9]+$/, "올바른 닉네임 형식이 아닙니다.");

const schema = z.object({
  nickname: nickNamezod,
  password: z.string().min(4, "비밀번호는 최소 4글자 이상이어야 합니다."),
  email: z.string().email("유효한 이메일주소가 아닙니다."),
});

export default function SignUpForm() {
  const [isNicknameVaild, setIsNickanemVaild] = useState<null | boolean>(null);
  const formMethod = useForm<SignupUser>({ resolver: zodResolver(schema) });
  const { register, handleSubmit } = formMethod;
  const router = useRouter();

  console.log("isNicknameVaild", isNicknameVaild);

  const test = ["닉네임"];

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
    onSuccess: (data) => {
      // alert("회원가입 완료되었습니다.")
      console.log(data);
      // router.replace("/auth/login");
    },
  });

  const nickname = useWatch({
    control: formMethod.control,
    name: "nickname", // 특정 필드 감시
  });

  const onSubmitHandler = (data: SignupUser) => {
    registerUserMutate(data);
  };

  // useEffect(() => {
  //   // 디바운싱
  //   const debounce = setTimeout(() => {
  //     const isNicknameValid = nickNamezod.safeParse(nickname);
  //     if (isNicknameValid?.success) {
  //       const isExist = test.includes(nickname);
  //       !isExist ? setIsNickanemVaild(true) : setIsNickanemVaild(false);
  //     }

  //     console.log("디바운싱");
  //   }, 700);

  //   return () => {
  //     console.log("클린업");
  //     clearTimeout(debounce);
  //   };
  // }, [nickname, test]);

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
        {/* <FormRegisterError /> */}

        <FormInput
          type="text"
          placeholder="이메일"
          {...register("email")}
          autoComplete="off"
          inputName="email"
        />
        <FormInput
          type="password"
          placeholder="비밀번호"
          {...register("password")}
          inputName="password"
        />
        <Button.submit type={"submit"} disabled={isPending}>
          회원가입
        </Button.submit>
      </FormProvider>
    </form>
  );
}
