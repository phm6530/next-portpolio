"use client";
import EmailAgreement from "@/app/_components/Agreed/EmailAgreed";
import { ChangeEvent, useState } from "react";
import { useFormContext } from "react-hook-form";

export default function TemplateAccess() {
  const [agreed, setAgreed] = useState<boolean>(false);

  const {
    register,
    formState: { errors },
  } = useFormContext();

  const onChkHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const target = e.currentTarget.checked;

    setAgreed(target ? true : false);
  };

  return (
    <div>
      <EmailAgreement />{" "}
      <label className="cursor">
        <input
          type="checkbox"
          {...register("access_email_agreed", {
            required: "약관 동의는 필수입니다.",
            onChange: onChkHandler,
          })}
        />
        위 내용을 모두 읽고 이해하였으며, 개인정보 수집 및 이용에 동의합니다.
      </label>
      <div>{errors.access_email_agreed?.message as string | null}</div>
      <div>
        이메일
        <input
          type="email"
          {...register("access_email", { required: "필수" })}
          disabled={!agreed}
        />
        <p>*삭제 및 관리를 위한 URL을 전달 드려요! 익명보장</p>
        <div>{errors.access_email?.message as string | null}</div>
      </div>
    </div>
  );
}
