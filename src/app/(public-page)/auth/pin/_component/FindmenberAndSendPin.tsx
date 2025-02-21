"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Dispatch, SetStateAction, useContext } from "react";
import { FormProvider, useForm } from "react-hook-form";
import classes from "./FindmenberAndSendPin.module.scss";
import * as z from "zod";
import { useMutation } from "@tanstack/react-query";
import { BASE_NEST_URL } from "@/config/base";
import { withFetch } from "@/util/clientUtil";
import InputField from "@/components/shared/inputs/input-field";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import { useUserEmail } from "../useUserEmail";
import useThrottling from "@/_hook/useThrottlring";

const schema = z.object({
  email: z.string().email("유효한 이메일주소가 아닙니다."),
});

export default function FindmenberAndSendPin({
  nextStep,
  setPin,
}: {
  nextStep: () => void;
  setPin: Dispatch<SetStateAction<string | null>>;
}) {
  const ctx = useUserEmail();
  const { throttle } = useThrottling();
  const method = useForm<z.infer<typeof schema>>({
    defaultValues: { email: "" },
    resolver: zodResolver(schema),
  });

  const { mutate, isPending } = useMutation<
    { authPin: number; member: boolean; userEmail: string },
    Error,
    z.infer<typeof schema>
  >({
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
      setPin(data.authPin + "");
      nextStep();
      ctx.setUserEmail(data.userEmail); // Set..
      toast.success("PIN 번호가 발송 되었습니다.");
    },
  });

  const { handleSubmit } = method;

  const sendPinNumber = (e: z.infer<typeof schema>) => {
    throttle(() => {
      mutate(e);
    }, 2000);
  };

  return (
    <>
      <FormProvider {...method}>
        <form
          onSubmit={handleSubmit(sendPinNumber)}
          className="flex flex-col gap-8 mt-8"
        >
          <InputField
            label="이메일"
            name="email"
            disabled={isPending}
            placeholder="가입 하셨던 이메일을 기재해주세요"
            description="해당 이메일로 4자리의 Pin 번호가 발송됩니다."
            autoComplete="off"
          />

          <Button disabled={isPending}>
            {isPending ? "발송 중..." : "Pin 발송"}
          </Button>
        </form>
      </FormProvider>
    </>
  );
}
