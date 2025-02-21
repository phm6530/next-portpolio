"use client";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { BASE_NEST_URL } from "@/config/base";
import { useRouter } from "next/navigation";
import requestHandler from "@/utils/withFetch";
import { toast } from "react-toastify";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { signUpSchema } from "./sinup-schema";
import InputField from "@/components/shared/inputs/input-field";
import PasswordInputField from "@/components/shared/inputs/input-password-field";
import useThrottling from "@/_hook/useThrottlring";
import LoadingSpinnerWrapper from "@/components/loading/LoadingSpinnerWrapper";

const THROTTLE_DELAY = 3000;
const FORM_DEFAULT_VALUES = {
  nickname: "",
  email: "",
  password: "",
  passwordConfirm: "",
} as const;

export default function SignUpForm() {
  const { throttle } = useThrottling();

  const formMethod = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: FORM_DEFAULT_VALUES,
  });

  const router = useRouter();
  const { isPending, mutate: registerUserMutate } = useMutation<
    unknown,
    Error,
    Omit<z.infer<typeof signUpSchema>, "passwordConfirm"> //Conmfirm 노필요
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
    onSuccess: () => {
      toast.success("회원가입 완료되었습니다.");
      router.replace("/auth/login");
    },
  });

  const onSubmitHandler = (data: z.infer<typeof signUpSchema>) => {
    const { passwordConfirm: _, ...rest } = data;
    throttle(() => registerUserMutate({ ...rest }), THROTTLE_DELAY);
  };

  return (
    <LoadingSpinnerWrapper loading={isPending}>
      <Form {...formMethod}>
        <form
          className="form-container mb-20"
          onSubmit={formMethod.handleSubmit(onSubmitHandler)}
        >
          <div className="form-input-wrapper gap-8 my-8">
            <InputField
              name="nickname"
              label="닉네임"
              placeholder="닉네임을 2글자 이상 입력해주세요."
            />

            <InputField
              name="email"
              label="이메일"
              description="인증은 필요하지 않지만, 비밀번호 찾기 시 해당 메일이 필요합니다."
              placeholder="이메일을 입력해주세요. 예) example@example.com"
            />

            <PasswordInputField label="비밀번호" />

            <PasswordInputField
              label="비밀번호 확인"
              name="passwordConfirm"
              placeholder="비밀번호를 확인 해 주세요"
            />
          </div>
          <Button size={"lg"} disabled={isPending}>
            회원가입
          </Button>
        </form>
      </Form>
    </LoadingSpinnerWrapper>
  );
}
