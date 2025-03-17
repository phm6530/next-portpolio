"use client";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { User } from "@/types/auth.type";
import requestHandler from "@/utils/withFetch";
import { BASE_NEST_URL } from "@/config/base";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import LoadingSpinnerWrapper from "@/components/ui/loading/LoadingSpinnerWrapper";
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
import { Button } from "@/components/ui/button";
import { z } from "zod";
import Link from "next/link";
import PasswordInputField from "@/components/shared/inputs/input-password-field";

type SignUpResponse = {
  accessToken: string;
  user: User;
};

export default function LoginForm() {
  const router = useRouter();
  const { throttle } = useThrottlring();
  const qs = useSearchParams();
  //zodResolver
  const formMethod = useForm<z.infer<typeof loginSchema>>({
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
    mutationFn: async (data: z.infer<typeof loginSchema>) => {
      return await requestHandler<SignUpResponse>(async () => {
        return await fetch(`${BASE_NEST_URL}/auth/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
          credentials: "include", // Client만 가능하다이거 AccessToken
        });
      });
    },
    onSuccess: () => {
      const redirectPath = qs.get("redirect") ?? "/";
      window.location.href = redirectPath;
    },
    onError: () => {
      // 미 일치시 Password 지워 버림
      // toast.error("이메일 또는 비밀번호가 일치하지 않습니다.");
      formMethod.setValue("password", "");
    },
  });

  //제출
  const onSubmitHandler = (data: z.infer<typeof loginSchema>) => {
    throttle(() => signUpMutate(data), 2000);
  };

  return (
    <LoadingSpinnerWrapper loading={isPending || isSuccess}>
      <Form {...formMethod}>
        <form
          className="form-container"
          onSubmit={formMethod.handleSubmit(onSubmitHandler)}
        >
          <div className="form-input-wrapper">
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

            <PasswordInputField
              placeholder="password
            "
            />
          </div>

          <Button className="" size={"lg"} disabled={isPending || isSuccess}>
            로그인
          </Button>
        </form>
      </Form>

      {/* login Footer Nav */}
      <div className="flex  text-center justify-center p-4 items-center">
        <Button
          asChild
          variant={"link"}
          className="text-[13px] text-muted-foreground"
        >
          <Link href={"/auth/pin"}>비밀번호를 잊어버리셨나요?</Link>
        </Button>
        <span className="opacity-20">|</span>
        <Button variant={"link"} className="text-[13px] text-muted-foreground">
          <Link href={"/auth/signup"}>회원가입</Link>
        </Button>
      </div>
    </LoadingSpinnerWrapper>
  );
}
