import { FormProvider, useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import AuthComplete from "./AuthComplete";
import { useMutation } from "@tanstack/react-query";
import { withFetch } from "@/util/clientUtil";
import { BASE_NEST_URL } from "@/config/base";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";
import PasswordInputField from "@/components/shared/inputs/input-password-field";
import { useUserEmail } from "../useUserEmail";

const schema = z
  .object({
    resetPassword: z.string().min(4, "비밀번호는 최소 4자 이상이어야 합니다."),
    resetPasswordChk: z.string(),
  })
  .refine((data) => data.resetPassword === data.resetPasswordChk, {
    message: "비밀번호가 일치하지 않습니다.",
    path: ["resetPasswordChk"],
  });

type schemaType = z.infer<typeof schema>;

type Test = { userEmail: string } & Omit<schemaType, "resetPasswordChk">;

export default function SettingPassword() {
  const ctx = useUserEmail();
  const methods = useForm<schemaType>({
    defaultValues: {
      resetPassword: "",
      resetPasswordChk: "",
    },
    resolver: zodResolver(schema),
  });

  const router = useRouter();

  const {
    handleSubmit,
    formState: { isValid },
  } = methods;

  console.log(ctx.userEmail);

  const { mutate, isPending, isSuccess } = useMutation<unknown, Error, Test>({
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
      toast.success("비밀번호가 변경되었습니다.");
      router.push("/auth/login");
    },
  });

  const changePassword = (data: schemaType) => {
    if (!ctx.userEmail) {
      toast.error("잘못된 요청입니다.");
      router.replace("/auth/pin");
    }
    mutate({
      resetPassword: data.resetPassword,
      userEmail: ctx.userEmail,
    });
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(changePassword)}
        className="flex flex-col gap-5 mt-8"
      >
        <PasswordInputField
          label="새 비밀번호"
          name="resetPassword"
          placeholder="설정하실 비밀번호를 입력해주세요"
          disabled={isPending}
        />

        <PasswordInputField
          label="새 비밀번호"
          name="resetPasswordChk"
          placeholder="비밀번호를 확인해주세요"
          disabled={isPending}
        />

        {/* 인증완료 */}
        {isValid && <AuthComplete complateText="비밀번호가 일치합니다." />}
        <Button className="py-6" disabled={!isValid || isPending || isSuccess}>
          {isPending ? "변경 중 ..." : "비밀번호 변경"}
        </Button>
      </form>
    </FormProvider>
  );
}
