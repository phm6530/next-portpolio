"use client";
import SubheaderDescrition from "@/components/ui/subheader-description";
import { ReactNode, useEffect, useRef, useState } from "react";
import FindmenberAndSendPin from "./_component/FindmenberAndSendPin";
import AccessMatchPin from "./_component/AccessMatchPin";
import SettingPassword from "./_component/SettingPassword";
import Indicator from "./_component/Indicator";
import UserEmailProvider from "./user-context";
import { useUserEmail } from "./useUserEmail";
import { AnimatePresence, motion } from "framer-motion";

const Motions = ({ children }: { children: ReactNode }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -100 }}
      style={{ width: "100%" }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 100 }}
      transition={{
        duration: 0.5,
        ease: [0.6, -0.05, 0.01, 0.99], // 예시 큐빅 베지어 값
      }}
    >
      {children}
    </motion.div>
  );
};

const ForgotPasswordPage = () => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [pin, setPin] = useState<string | null>(null);
  const { resetUserEmail } = useUserEmail();
  const contentRef = useRef<HTMLDivElement>(null);

  const nextStep = () => {
    setStep((prev) => (prev < 3 ? ((prev + 1) as 1 | 2 | 3) : prev));
  };

  useEffect(() => {
    return () => resetUserEmail(); // 페이지 이탈시 메모리 정리
  }, [resetUserEmail]);

  const stepData: Record<
    number,
    { title: string; description: string; component: JSX.Element }
  > = {
    1: {
      title: "비밀번호 재설정",
      description: "가입 하셨던 email이 필요합니다.",
      component: <FindmenberAndSendPin nextStep={nextStep} setPin={setPin} />,
    },
    2: {
      title: "PIN 번호 입력",
      description: "이메일로 전송된 4자리를 입력해주세요",
      component: (
        <AccessMatchPin
          authPin={pin as string}
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
      <SubheaderDescrition
        title={stepData[step].title}
        description={stepData[step].description}
      />{" "}
      <Indicator step={step} />
      <UserEmailProvider>
        <AnimatePresence mode="wait">
          <motion.div
            key={step} // `key`를 통해 step이 바뀔 때마다 컴포넌트를 새로 마운트
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 0.5,
              ease: [0.6, -0.05, 0.01, 0.99],
            }}
          >
            {stepData[step].component}
          </motion.div>
        </AnimatePresence>
      </UserEmailProvider>
    </div>
  );
};

export default ForgotPasswordPage;
