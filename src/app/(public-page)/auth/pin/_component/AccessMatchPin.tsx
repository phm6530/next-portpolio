"use client";
import PinTimer from "./PinTimer";
import { FormProvider, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dispatch, SetStateAction } from "react";

import InputField from "@/components/shared/inputs/input-field";
import AuthComplete from "./AuthComplete";
import { useRouter } from "next/navigation";

const createSchema = (authPin: string) =>
  z.object({
    pin: z
      .string()
      .length(4, "PIN 번호는 4자리여야 합니다.")
      .refine(
        (inputPin) => inputPin === authPin,
        "입력한 PIN 번호가 일치하지 않습니다."
      ),
  });

export default function AccessMatchPin({
  authPin,
  nextStep,
  setPin,
}: {
  authPin: string;
  nextStep: () => void;
  setPin: Dispatch<SetStateAction<string | null>>;
}) {
  const schema = createSchema(authPin); // PIN을 동적으로 전달
  const router = useRouter();
  const methods = useForm<z.infer<typeof schema>>({
    defaultValues: {
      pin: "",
    },
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  const {
    handleSubmit,
    formState: { isValid },
  } = methods;

  const matchPin = (e: z.infer<typeof schema>) => {
    if (e.pin === authPin) {
      nextStep();
    }
  };

  const Timeout = () => {
    setPin(null); // 핀번호 리셋
    router.refresh();
  };

  return (
    <>
      <FormProvider {...methods}>
        <form
          onSubmit={handleSubmit(matchPin)}
          className="mt-5 flex flex-col gap-5"
        >
          <div>
            <InputField
              name="pin"
              maxLength={4}
              placeholder="PIN 번호 4자리를 입력해주세요"
            />
            <PinTimer timeout={Timeout} />
          </div>

          {/* 인증완료 */}
          {isValid && <AuthComplete complateText="인증 완료" />}
          <Button disabled={!isValid}>인증</Button>
          {/* <Button.outlineButton type="submit">인증</Button.outlineButton> */}
        </form>
      </FormProvider>
    </>
  );
}
