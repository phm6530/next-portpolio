import { FormProvider, useForm } from "react-hook-form";
import classes from "./SettingPassword.module.scss";
import InputWrapper from "@/components/ui/InputWrapper/InputWrapper";
import FormInput from "@/components/ui/FormElement/FormInput";
import Button from "@/components/ui/button/Button";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import AuthComplete from "./AuthComplete";
import useStore from "@/store/store";
import { useMutation } from "@tanstack/react-query";
import { withFetch } from "@/util/clientUtil";
import { BASE_NEST_URL } from "@/config/base";
import { useRouter } from "next/navigation";

const schema = z
  .object({
    resetPassword: z
      .string()
      .min(4, "비밀번호는 최소 4자 이상이어야 합니다."),
    resetPasswordChk: z.string(),
  })
  .refine((data) => data.resetPassword === data.resetPasswordChk, {
    message: "비밀번호가 일치하지 않습니다.",
    path: ["resetPasswordChk"],
  });

type schemaType = z.infer<typeof schema>;

type Test = { userEmail: string } & Omit<
  schemaType,
  "resetPasswordChk"
>;

export default function SettingPassword() {
  const methods = useForm<schemaType>({
    resolver: zodResolver(schema),
  });
  const store = useStore();
  const router = useRouter();

  const {
    handleSubmit,
    register,
    formState: { isValid },
  } = methods;

  const { mutate } = useMutation<unknown, Error, Test>({
    mutationFn: async (data) => {
      return await withFetch(async () => {
        return await fetch(`${BASE_NEST_URL}/auth/password/reset`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
      });
    },
    onSuccess: () => {
      alert("비밀번호가 변경되었습니다.");
      router.push("/auth/login");
    },
  });

  const changePassword = (data: schemaType) => {
    if (store.userEmail)
      mutate({
        resetPassword: data.resetPassword,
        userEmail: store.userEmail,
      });
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(changePassword)}
        className={classes.form}
      >
        <InputWrapper title="새 비밀번호">
          <FormInput
            type="password"
            placeholder="새 비밀번호를 입력해주세요"
            {...register("resetPassword")}
          />
        </InputWrapper>

        <InputWrapper title="새 비밀번호 확인">
          <FormInput
            type="password"
            placeholder="새 비밀번호를 다시 입력해주세요"
            {...register("resetPasswordChk")}
          />
        </InputWrapper>

        {/* 인증완료 */}
        {isValid && (
          <AuthComplete complateText="비밀번호가 일치합니다." />
        )}
        <Button.submit>비밀번호 변경</Button.submit>
      </form>
    </FormProvider>
  );
}
