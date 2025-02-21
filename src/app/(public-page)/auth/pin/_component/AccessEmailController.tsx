import {
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
  ChangeEvent,
} from "react";
import { useFormContext } from "react-hook-form";
import { AddSurveyFormProps } from "@/types/templateSurvey";
import { useMutation } from "@tanstack/react-query";
import { withFetch } from "@/util/clientUtil";
import addPin from "@/util/addPin";
import classes from "./AccessEmailController.module.scss";
import { BASE_URL } from "@/config/base";
import FormInput from "@/components/ui/FormElement/FormInput";

export default function AccessEmailController({
  agreed,
  isAgreed,
  setIsAgreed,
}: {
  agreed: boolean;
  isAgreed: boolean | "ing";
  setIsAgreed: Dispatch<SetStateAction<boolean | "ing">>;
}) {
  const {
    getValues,
    trigger,
    setFocus,
    register,
    setValue,
    formState: { errors },
  } = useFormContext<AddSurveyFormProps>();
  const [countdown, setCountdown] = useState<number>(120); // 2분 = 120초
  const [pin, setPin] = useState<number | null>(null);

  const { mutate } = useMutation({
    mutationFn: (data: { pin: number; userEmail: string }) =>
      withFetch<number>(async () => {
        const url = `${BASE_URL}/api/auth/email`;
        return fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
      }),
  });

  // 이메일 유효성 검사
  const Access_email = async () => {
    const isValid = await trigger("access_email");

    if (!isValid) {
      setFocus("access_email");
      return;
    }

    const userEmail = getValues("access_email");

    // 인증 진행 중 상태로 변경
    setIsAgreed("ing");
    setCountdown(300);
    const pinNumber = addPin(4);
    setPin(pinNumber); // PIN 번호 상태 업데이트

    // PIN 번호가 업데이트된 후 mutate 호출
    if (pinNumber !== null) {
      mutate({ pin: pinNumber, userEmail: userEmail as string });
    }
  };

  // 인증 취소 버튼 클릭 시
  const cancelAccessEmail = () => {
    setIsAgreed(false);
    setCountdown(300); // 타이머 초기화
    setPin(null); // 핀초기화
  };

  // 카운트다운 타이머 관리
  useEffect(() => {
    if (isAgreed === "ing" && countdown > 0) {
      const timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(timer); // 컴포넌트 언마운트 시 타이머 정리
    } else if (countdown === 0) {
      setIsAgreed(false);
    }
  }, [isAgreed, countdown, setIsAgreed]);

  const onAuthMailNumber = async (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    if (+value === pin) {
      setIsAgreed(true);
      setValue("access_pin", pin);
      await trigger("access_pin");
    }
  };

  const authError = errors.access_pin?.message;

  return (
    <>
      {/* 인증번호 hidden  */}
      <FormInput
        type="hidden"
        {...register("access_pin", {
          required: "인증은 필수입니다. ",
        })}
      />

      {isAgreed === true ? (
        <button type="button" disabled={!agreed || isAgreed === true}>
          인증완료
        </button>
      ) : isAgreed === "ing" ? (
        <>
          <FormInput
            placeholder="인증번호를 입력해주세요"
            onChange={onAuthMailNumber}
          />
          <p>
            남은 시간: {Math.floor(countdown / 60)}:
            {("0" + (countdown % 60)).slice(-2)}
          </p>

          <button type="button" onClick={cancelAccessEmail}>
            인증 취소
          </button>
        </>
      ) : (
        <button
          type="button"
          onClick={Access_email}
          disabled={!agreed}
          className={authError ? classes.error : undefined}
        >
          인증
        </button>
      )}
      {<div>{authError}</div>}
    </>
  );
}
