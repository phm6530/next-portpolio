import Link from "next/link";

export default function templatePage() {
  const PATH = "/survey/template";

  return (
    <>
      <h1>템플릿 페이지</h1>
      <Link href={`${PATH}/default`}>Survey</Link>
      <Link href={`${PATH}/rank`}>Rank</Link>
    </>
  );
}
