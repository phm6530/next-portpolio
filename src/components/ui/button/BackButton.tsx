"use client";
import Button from "@/components/ui/button/Button";
import { useRouter } from "next/navigation";
import Prev from "/public/asset/icon/prev.svg";

export default function BackButton() {
  const router = useRouter();
  return (
    <Button.normalButton onClick={() => router.push("/list")}>
      <Prev /> 목록으로
    </Button.normalButton>
  );
}
