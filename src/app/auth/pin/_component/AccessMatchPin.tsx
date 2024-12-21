import PinTimer from "./PinTimer";
import { FormProvider, useForm } from "react-hook-form";
import InputWrapper from "@/components/ui/InputWrapper/InputWrapper";
import FormInput from "@/components/ui/FormElement/FormInput";
import Button from "@/components/ui/button/Button";
import classes from "./AccessMatchPin.module.scss";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import Verified from "/public/asset/icon/Verified.svg";

const createSchema = (pin: string) =>
  z.object({
    pin: z
      .string()
      .length(4, "PIN 번호는 4자리여야 합니다.")
      .refine((val) => val === pin, "입력한 PIN 번호가 일치하지 않습니다."),
  });

export default function AccessMatchPin({
  pin,
  nextStep,
}: {
  pin: string;
  nextStep: () => void;
}) {
  const schema = createSchema(pin || ""); // PIN을 동적으로 전달
  const methods = useForm<{ pin: string }>({
    resolver: zodResolver(schema),
  });

  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = methods;

  useEffect(() => {
    if (isValid) {
      setTimeout(() => {
        nextStep();
      }, 1000);
    }
  }, [isValid]);

  const matchPin = (e: { pin: string }) => {
    console.log(e.pin);
    if (parseInt(e.pin, 10) === parseInt(pin)) {
      console.log("일치함");
    }
  };

  console.log(isValid);

  return (
    <>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(matchPin)} className={classes.form}>
          <div>
            <InputWrapper
              title="PIN 번호"
              // description="* 핀번호 4자리를 입력해주세요"
            >
              <FormInput
                type="text"
                placeholder="핀번호 4자리를 입력해주세요"
                {...register("pin")}
                maxLength={4}
                disabled={isValid}
              />
            </InputWrapper>
            <PinTimer />
          </div>
          {isValid && (
            <div className={classes.success}>
              <Verified />
              인증 완료
            </div>
          )}

          <Button.outlineButton type="submit">인증</Button.outlineButton>
        </form>
      </FormProvider>
    </>
  );
}
