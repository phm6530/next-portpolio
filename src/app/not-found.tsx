"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function NotFound() {
  const router = useRouter();

  useEffect(() => {
    console.log(window.history);
  }, []);

  const handleBack = () => {
    router.back();
  };

  const handleHome = () => {
    router.replace("/");
  };

  return (
    <>
      잘못된 경로이거나 서버오류 입니다.
      <button onClick={handleHome}>Home</button>
      <button onClick={handleBack}>뒤로가기</button>
    </>
  );
}
