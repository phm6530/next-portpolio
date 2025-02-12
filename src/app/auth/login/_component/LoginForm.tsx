"use client";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { SignIn, User } from "@/types/auth.type";
import Button from "@/components/ui/button/Button";
import requestHandler from "@/utils/withFetch";
import { BASE_NEST_URL } from "@/config/base";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import LoadingSpinnerWrapper from "@/components/loading/LoadingSpinnerWrapper";
import PasswordInput from "@/components/ui/password-input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { loginSchema } from "./login-schema";
import { Input } from "@/components/ui/input";
import { toast } from "react-toastify";
import useThrottlring from "@/_hook/useThrottlring";

type SignUpResponse = {
  accessToken: string;
  user: User;
};

export default function LoginForm() {
  const router = useRouter();
  const { throttle } = useThrottlring();
  //zodResolver
  const formMethod = useForm<SignIn>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const {
    mutate: signUpMutate,
    isPending,
    isSuccess,
  } = useMutation({
    mutationFn: async (data: SignIn) => {
      return await requestHandler<SignUpResponse>(async () => {
        // await new Promise((resolve) => setTimeout(resolve, 3000));
        return await fetch(`${BASE_NEST_URL}/auth/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
          credentials: "include", // Client만 가능하다이거 AccessToken
        });
      });
    },
    onSuccess: (data) => {
      //초기 로그인 시에 사용자 정보 + 토큰 반영
      const { nickname, email, role, id } = data.user;
      router.refresh();
    },
    onError: () => {
      // 미 일치시 Password 지워 버림
      toast.error("이메일 또는 비밀번호가 일치하지 않습니다.");
      formMethod.setValue("password", "");
    },
  });

  //제출
  const onSubmitHandler = (data: SignIn) => {
    throttle(() => signUpMutate(data), 2000);
  };

  return (
    <LoadingSpinnerWrapper loading={isPending || isSuccess}>
      <Form {...formMethod}>
        <form
          className="flex flex-col"
          onSubmit={formMethod.handleSubmit(onSubmitHandler)}
        >
          <div className="mb-4 flex flex-col">
            {/* Email */}
            <FormField
              control={formMethod.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel />
                  <FormControl>
                    <Input
                      {...field}
                      autoComplete="off"
                      placeholder="이메일을 입력해주세요"
                    />
                  </FormControl>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={formMethod.control}
              name="password"
              render={({ field }) => {
                const { ref, ...rest } = field;
                return (
                  <FormItem>
                    <FormLabel />
                    <FormControl>
                      <PasswordInput
                        {...rest}
                        autoComplete="off"
                        placeholder="비밀번호를 입력해주세요"
                      />
                    </FormControl>
                    <FormDescription />
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
          </div>
          <Button.submit disabled={isPending || isSuccess}>
            로그인
          </Button.submit>
        </form>
      </Form>
    </LoadingSpinnerWrapper>
  );
}
