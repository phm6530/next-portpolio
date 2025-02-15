import { z } from "zod";
import PasswordInputField from "../inputs/input-password-field";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import ConfirmDialog from "@/components/ui/confirm-dialog";
import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { LegacyRef, useRef } from "react";

const schema = z.object({
  password: z.string().min(1, "비밀번호를 입력해주세요"),
});

export default function PasswordConfirmModal(cb: any) {
  const ref = useRef<LegacyRef<HTMLButtonElement> | undefined>();

  const method = useForm<z.infer<typeof schema>>({
    defaultValues: { password: "" },
    resolver: zodResolver(schema),
  });

  const submitHandler = async (data: z.infer<typeof schema>) => {
    await cb(data);
  };

  return (
    <AlertDialogContent>
      <FormProvider {...method}>
        <form onSubmit={method.handleSubmit(submitHandler)}>
          <AlertDialogHeader>
            <AlertDialogTitle>비밀번호 입력</AlertDialogTitle>
            <AlertDialogDescription>
              설정하셨던 4자리 이상 비밀번호를 입력해주세요
              <div className="flex gap-4 items-center">
                <PasswordInputField
                  className="my-5 flex-1"
                  placeholder="비밀번호 입력"
                />
                <Button onClick={() => {}}>test</Button>
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel ref={ref.current}>취소</AlertDialogCancel>
            {/* <AlertDialogAction
              type="submit"
              onClick={(e) => {
                e.preventDefault();
              }}
            >
              확인
            </AlertDialogAction> */}
          </AlertDialogFooter>
        </form>
      </FormProvider>
    </AlertDialogContent>
  );
}
