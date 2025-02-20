"use client";

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
import React, { ButtonHTMLAttributes, ReactElement, useState } from "react";

export default function ConfirmButton({
  title,
  children,
  description,
  cb,
}: {
  title: string;
  children: ReactElement<ButtonHTMLAttributes<HTMLButtonElement>>;
  description?: string;
  cb: (...arg: any) => Promise<void> | void;
}) {
  const [open, setOpen] = useState<boolean>(false);

  const ModalTriggerButton = React.cloneElement(children, {
    onClick: () => setOpen(true),
  });

  const submitHandler = async () => {
    await cb();
    setOpen(false);
  };

  return (
    <AlertDialog open={open}>
      {ModalTriggerButton}
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setOpen(false)}>
            취소
          </AlertDialogCancel>
          <AlertDialogAction onClick={submitHandler}>확인</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
