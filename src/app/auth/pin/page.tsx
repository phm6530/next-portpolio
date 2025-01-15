"use client";
import HeaderTitle from "@/app/(template-made)/components/Header/HeaderTitle";
import { useEffect, useRef, useState } from "react";
import FindmenberAndSendPin from "./_component/FindmenberAndSendPin";
import AccessMatchPin from "./_component/AccessMatchPin";
import SettingPassword from "./_component/SettingPassword";
import Indicator from "./_component/Indicator";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const ForgotPasswordPage = () => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [pin, setPin] = useState<string | null>(null);
  const [aniTrigger, setAniTrigger] = useState(false);

  const contentRef = useRef<HTMLDivElement>(null);

  const nextStep = () => {
    setStep((prev) => (prev < 3 ? ((prev + 1) as 1 | 2 | 3) : prev));
  };

  console.log(contentRef.current, aniTrigger);

  useEffect(() => {
    if (!contentRef.current || !aniTrigger) return;
    const tl = gsap.timeline();

    tl.fromTo(
      contentRef.current,
      { x: 0, opacity: 1, duration: 0.5 },
      {
        x: -100,
        opacity: 0,
        onComplete: () => {
          setStep((prev) =>
            prev < 3 ? ((prev + 1) as 1 | 2 | 3) : prev
          ); // 여기서 상태 업데이트
        },
      }
    );

    tl.fromTo(
      contentRef.current,
      { x: 100, opacity: 0, ease: "back.in" },
      {
        x: "0%",
        opacity: 1,
        duration: 0.5,
        onComplete: () => setAniTrigger(false),
      }
    );
  }, [aniTrigger, contentRef]);

  const stepData: Record<
    number,
    { title: string; description: string; component: JSX.Element }
  > = {
    1: {
      title: "비밀번호 재설정",
      description: "가입 하셨던 email이 필요합니다.",
      component: (
        <FindmenberAndSendPin
          nextStep={nextStep}
          setAniTrigger={setAniTrigger}
          setPin={setPin}
        />
      ),
    },
    2: {
      title: "PIN 번호 입력",
      description: "이메일로 전송된 4자리를 입력해주세요",
      component: (
        <AccessMatchPin
          pin={pin + ""}
          setAniTrigger={setAniTrigger}
          nextStep={nextStep}
          setPin={setPin}
        />
      ),
    },
    3: {
      title: "비밀번호를 재설정 해주세요.",
      description: "새로운 비밀번호를 입력해주세요.",
      component: <SettingPassword />,
    },
  };

  return (
    <div>
      <button onClick={() => setAniTrigger(true)}>test</button>
      <HeaderTitle
        title={stepData[step].title}
        description={stepData[step].description}
      />{" "}
      <Indicator step={step} />
      <div ref={contentRef}>{stepData[step].component}</div>
    </div>
  );
};

export default ForgotPasswordPage;
