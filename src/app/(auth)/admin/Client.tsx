"use client";
import React from "react"; // 이 줄을 추가합니다.

export default function ClientTester() {
  const onClickHandler = async () => {
    try {
      const response = await fetch("/api/authRequred");
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }
      const data = await response.json();
    } catch (error) {
      if (error instanceof Error) {
        console.error("API 호출 중 에러 발생:", error.message);
      }
    }
  };

  return (
    <>
      124
      <button onClick={onClickHandler}>요청</button>
    </>
  );
}
