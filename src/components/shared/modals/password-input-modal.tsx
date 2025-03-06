import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import PasswordInputField from "../inputs/input-password-field";
import React, { ButtonHTMLAttributes, ReactElement, useState } from "react";
import useThrottling from "@/_hook/useThrottlring";

const schema = z.object({
  password: z.string().min(1, "비밀번호를 입력해주세요"),
});
export function PsConfirmModal({
  cb,
  disalbed,
  children,
}: {
  cb: (_data: z.infer<typeof schema>) => Promise<void>;
  disalbed?: boolean;
  children: ReactElement<ButtonHTMLAttributes<HTMLButtonElement>>;
}) {
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const { throttle } = useThrottling();

  const method = useForm<z.infer<typeof schema>>({
    defaultValues: { password: "" },
    resolver: zodResolver(schema),
  });

  const submitHandler = async (data: z.infer<typeof schema>) => {
    throttle(async () => {
      await cb(data);
      setModalOpen(false);
      method.reset();
    }, 2000);
  };

  const CloneButtonInOpner = React.cloneElement(children, {
    onClick: () => setModalOpen(true),
  });

  return (
    <AlertDialog open={modalOpen}>
      {CloneButtonInOpner}
      <AlertDialogContent>
        <FormProvider {...method}>
          <AlertDialogHeader>
            <AlertDialogTitle>삭제하시겠습니까?</AlertDialogTitle>
            <AlertDialogDescription>
              <p className="mb-5">생성 시 기재하였던 비밀번호를 입력해주세요</p>

              <form onSubmit={method.handleSubmit(submitHandler)}>
                <PasswordInputField disabled={disalbed} />
              </form>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              onClick={() => {
                setModalOpen(false);
                method.reset();
              }}
            >
              닫기
            </AlertDialogCancel>
            <AlertDialogAction onClick={method.handleSubmit(submitHandler)}>
              삭제
            </AlertDialogAction>
          </AlertDialogFooter>
        </FormProvider>
      </AlertDialogContent>
    </AlertDialog>
  );
}
