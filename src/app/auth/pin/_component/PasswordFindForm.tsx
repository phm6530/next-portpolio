"use client";
import Button from "@/components/ui/button/Button";
import FormInput from "@/components/ui/FormElement/FormInput";
import InputWrapper from "@/components/ui/InputWrapper/InputWrapper";
import addPin from "@/utils/addPin.utill";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import classes from "./PasswordFindForm.module.scss";
import * as z from "zod";
import { useMutation } from "@tanstack/react-query";
import { resolve } from "path";

const schema = z.object({
  email: z.string().email("유효한 이메일주소가 아닙니다."),
});

export default function PasswordFindForm() {
  const method = useForm({ resolver: zodResolver(schema) });
  const {
    mutate,
    isPending,
    isSuccess: isPinSuccess,
  } = useMutation({
    mutationFn: async () => {
      const delay = await new Promise((resolve) =>
        setTimeout(() => resolve("test"), 50000)
      );
      return delay;
    },
  });

  const {
    register,
    handleSubmit,
    formState: { isValid, errors },
  } = method;
  const [pin, setPin] = useState();

  console.log("isValid:", errors);

  const pins = addPin(4);

  const sendPinNumber = (e) => {
    mutate();
  };

  return (
    <>
      <FormProvider {...method}>
        <form onSubmit={handleSubmit(sendPinNumber)} className={classes.form}>
          <InputWrapper
            title="이메일"
            description="* 해당 이메일로 PIN 번호 4자리 전송됩니다."
          >
            <FormInput
              type="text"
              placeholder="가입 하셨던 이메일을 기재해주세요"
              {...register("email")}
              disabled={isPending}
            />
          </InputWrapper>

          <Button.outlineButton type="submit" disabled={isPending}>
            {isPending ? "발송 중..." : "Pin 발송"}
          </Button.outlineButton>
        </form>
      </FormProvider>
    </>
  );
}
