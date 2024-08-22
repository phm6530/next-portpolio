"use client";

import { useRouter } from "next/navigation";

export default function AdminButton({ id }: { id: string }) {
  const router = useRouter();

  return (
    <>
      <button onClick={() => router.push(`/template/result/${id}`)}>
        결과 보기
      </button>
    </>
  );
}
