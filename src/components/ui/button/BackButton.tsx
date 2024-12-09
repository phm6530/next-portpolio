"use client";
import Button from "@/components/ui/button/Button";
import { useRouter } from "next/navigation";

// import PrevImg from "/public/asset/icon/prev.png";
import Image from "next/image";

export default function BackButton() {
  const router = useRouter();
  return (
    <Button.normalButton onClick={() => router.push("/list")}>
      {/* <PrevSvg /> */}
      {/* <Image src={PrevImg} width={7} alt="prev" /> */}
      목록으로
    </Button.normalButton>
  );
}
