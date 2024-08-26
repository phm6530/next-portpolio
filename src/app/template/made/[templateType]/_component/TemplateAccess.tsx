"use client";
import EmailAgreement from "@/app/_components/Agreed/EmailAgreed";
import AccessEmailController from "@/app/template/made/[templateType]/_component/AccessEmailController";
import { AddSurveyFormProps } from "@/types/templateSurvey";

import { ChangeEvent, useState } from "react";
import { useFormContext } from "react-hook-form";

export default function TemplateAccess() {
  const [agreed, setAgreed] = useState<boolean>(false);
  const [isAgreed, setIsAgreed] = useState<boolean | "ing">(false);

  const {
    register,
    trigger,
    formState: { errors },
  } = useFormContext<AddSurveyFormProps>();

  const onChkHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const target = e.currentTarget.checked;
    setAgreed(target ? true : false);
  };

  return (
    <div>
      {/* 개인정보 약관 */}
      <EmailAgreement />

      <label className="cursor">
        <input
          type="checkbox"
          {...register("access_email_agreed", {
            required: "약관 동의는 필수입니다.",
            onChange: onChkHandler,
          })}
          readOnly={isAgreed !== false}
        />
        위 내용을 모두 읽고 이해하였으며, 개인정보 수집 및 이용에 동의합니다.
      </label>
      <div>{errors.access_email_agreed?.message as string | null}</div>
      <div>
        이메일
        <input
          type="text"
          {...register("access_email", {
            required: "이메일은 필수입니다.",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "이메일 형식을 확인해주세요.",
            },
            onChange: () => trigger("access_email"),
          })}
          readOnly={!agreed || isAgreed === "ing" || isAgreed}
        />
        {/* 이메일 인증 */}
        <AccessEmailController
          agreed={agreed}
          isAgreed={isAgreed}
          setIsAgreed={setIsAgreed}
        />
        <div>{errors.access_email?.message as string | null}</div>
        <p>
          *인증 완료 후 설문조사 개설하시면 삭제 및 관리를 위한 URL을 전달
          드려요! 익명보장*
        </p>
      </div>
    </div>
  );
}
