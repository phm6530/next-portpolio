"use client";

import { triggerRevalidation } from "@/app/about/serverAction";

export default function Client() {
  const refetchButton = async () => {
    await triggerRevalidation();
  };

  return (
    <button type="button" onClick={refetchButton}>
      버튼!! 이거 머지 한번해보려고
    </button>
  );
}
