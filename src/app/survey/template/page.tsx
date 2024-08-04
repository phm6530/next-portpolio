import NotYet from "@/app/_components/NotYet";
import Link from "next/link";

export default function templatePage() {
  const PATH = "/survey/template";

  return (
    <>
      <h1>만드실 템플릿을 선택해주세요</h1>
      <Link href={`${PATH}/default`}>Survey</Link>
      <NotYet>Rank</NotYet>
      <NotYet>Rank</NotYet>
    </>
  );
}
