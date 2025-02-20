import PinTimer from "./PinTimer";
import { FormProvider, useForm } from "react-hook-form";
import InputWrapper from "@/components/ui/InputWrapper/InputWrapper";
import FormInput from "@/components/ui/FormElement/FormInput";
import Button from "@/components/ui/button/Button";
import classes from "./AccessMatchPin.module.scss";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dispatch, SetStateAction, useEffect } from "react";
import AuthComplete from "./AuthComplete";
import useStore from "@/store/store";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

const createSchema = (pin: string) =>
  z.object({
    pin: z
      .string()
      .length(4, "PIN 번호는 4자리여야 합니다.")
      .refine((val) => val === pin, "입력한 PIN 번호가 일치하지 않습니다."),
  });

type NavType = "next" | "prev";

export default function AccessMatchPin({
  pin,
  setAniTrigger,
  nextStep,
  setPin,
}: {
  pin: string;
  nextStep: (arg: NavType) => void;
  setPin: Dispatch<SetStateAction<string | null>>;
  setAniTrigger: Dispatch<SetStateAction<boolean>>;
}) {
  const store = useStore();

  const schema = createSchema(pin || ""); // PIN을 동적으로 전달

  const methods = useForm<{ pin: string }>({
    resolver: zodResolver(schema),
  });

  const {
    register,
    handleSubmit,
    control,
    formState: { isValid },
  } = methods;

  const matchPin = (e: { pin: string }) => {
    if (parseInt(e.pin, 10) === parseInt(pin)) {
      nextStep("next");
    }
  };

  const Timeout = () => {
    setPin(null); // 핀번호 리셋
    nextStep("prev");
    store.setResetUser();
  };

  return (
    <>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(matchPin)} className={classes.form}>
          <FormField
            control={control}
            name="pin"
            render={({ field }) => (
              <FormItem>
                <FormLabel>PIN</FormLabel>{" "}
                <FormDescription>
                  메일로 발송된 4자리 숫자를 입력해주세요
                </FormDescription>
                <FormControl>
                  <InputOTP maxLength={6} {...field}>
                    <InputOTPGroup className="w-full justify-between grid grid-cols-[1fr_1fr_1fr_1fr] h-[60px]">
                      <InputOTPSlot index={0} className="w-full h-full" />
                      <InputOTPSlot index={1} className="w-full h-full" />
                      <InputOTPSlot index={2} className="w-full h-full" />
                      <InputOTPSlot index={3} className="w-full h-full" />
                    </InputOTPGroup>
                  </InputOTP>
                </FormControl>
                <FormDescription className="text-foreground">
                  <PinTimer timeout={Timeout} />
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* 인증완료 */}
          {isValid && <AuthComplete complateText="인증 완료" />}

          <Button.outlineButton type="submit">인증</Button.outlineButton>
        </form>
      </FormProvider>
    </>
  );
}
