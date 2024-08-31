"use client";

import { triggerRevalidation } from "@/app/about/serverAction";

export default function Client() {
  const refetchButton = async () => {
    await triggerRevalidation();
  };

  return (
    <button type="button" onClick={refetchButton}>
      버튼!
    </button>
  );
}
