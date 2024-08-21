"use client";

import { useMutation } from "@tanstack/react-query";
import { signIn } from "next-auth/react";

import { FormEvent } from "react";

export default function PinPage({
  template_key,
  redirectPath,
}: {
  template_key: string;
  redirectPath: string;
}) {
  const { mutate } = useMutation({
    mutationFn: async (data: { pin: number; template_key: string }) => {
      const result = await signIn("anonymous", {
        redirect: false,
        template_key: data.template_key,
        pin: data.pin, // 핀
      });

      // NextAuth에서 error는 문자열로 반환됩니다.
      if (result?.error) {
        throw new Error("핀번호가 일치하지 않거나 잘못된 요청입니다."); // 문자열로 처리
      }
      return result;
    },
    onSuccess: () => {
      window.location.href = redirectPath;
    },
  });

  const onSubmithandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const pin = formData.get("pinNumber");

    if (!pin || typeof pin !== "string" || pin.length !== 4) {
      alert("핀번호를 정확히 입력하세요.");
      return;
    }

    //제출
    mutate({ pin: +pin, template_key });
  };

  return (
    <>
      관리자 고유번호를 입력해주세요
      <form onSubmit={onSubmithandler}>
        <input type="text" name="pinNumber" />
        <button type="submit">인증</button>
      </form>
    </>
  );
}
