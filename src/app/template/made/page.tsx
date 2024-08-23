import NotYet from "@/app/_components/NotYet";
import Link from "next/link";

export default function templatePage() {
  const PATH = "/template/made";

  return (
    <>
      <h1>만드실 템플릿을 선택해주세요</h1>
      <Link href={`${PATH}/survey`}>Survey</Link>
      <NotYet>Rank</NotYet>
      <NotYet>Rank</NotYet>
    </>
  );
}
