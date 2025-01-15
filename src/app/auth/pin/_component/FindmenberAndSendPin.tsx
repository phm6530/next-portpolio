"use client";
import Button from "@/components/ui/button/Button";
import FormInput from "@/components/ui/FormElement/FormInput";
import InputWrapper from "@/components/ui/InputWrapper/InputWrapper";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dispatch, SetStateAction } from "react";
import { FormProvider, useForm } from "react-hook-form";
import classes from "./FindmenberAndSendPin.module.scss";
import * as z from "zod";
import { useMutation } from "@tanstack/react-query";
import { BASE_NEST_URL } from "@/config/base";
import { withFetch } from "@/util/clientUtil";
import useStore from "@/store/store";

const schema = z.object({
  email: z.string().email("유효한 이메일주소가 아닙니다."),
});

type Response = {
  menber: boolean;
  authPin: string;
  userEmail: string;
};

type FormType = {
  email: string;
};
type NavType = "next" | "prev";

export default function FindmenberAndSendPin({
  nextStep,
  setPin,
  setAniTrigger,
}: {
  nextStep: (arg: NavType) => void;
  setPin: Dispatch<SetStateAction<string | null>>;
  setAniTrigger: Dispatch<SetStateAction<boolean>>;
}) {
  const method = useForm<FormType>({ resolver: zodResolver(schema) });
  const store = useStore();

  const {
    mutate,
    isPending,
    isSuccess: isPinSuccess,
  } = useMutation<Response, Error, FormType>({
    mutationFn: async (data) => {
      return await withFetch(async () => {
        return fetch(`${BASE_NEST_URL}/auth/password/forgot`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
      });
    },
    onSuccess: (data) => {
      // 4자리 Pin 번호

      setPin(data.authPin);
      setAniTrigger(true);
      store.setPasswordUser(data.userEmail);
    },
  });

  const {
    register,
    handleSubmit,
    formState: { isValid, errors },
  } = method;

  const sendPinNumber = (e: FormType) => {
    mutate(e);
  };
  return (
    <>
      {!isPinSuccess && (
        <FormProvider {...method}>
          <form
            onSubmit={handleSubmit(sendPinNumber)}
            className={classes.form}
          >
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
      )}

      {/* 타이머 */}
    </>
  );
}
