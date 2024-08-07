import NotYet from "@/app/_components/NotYet";
import Link from "next/link";
import { v4 as uuidv4 } from "uuid";

export default function templatePage() {
  const PATH = "/survey/template";
  const imageUploadId = uuidv4();
  return (
    <>
      <h1>만드실 템플릿을 선택해주세요</h1>
      <Link href={`${PATH}/survey/${imageUploadId}`}>Survey</Link>
      <NotYet>Rank</NotYet>
      <NotYet>Rank</NotYet>
    </>
  );
}
