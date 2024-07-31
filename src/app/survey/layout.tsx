import PageTitle from "@/app/_components/ui/PageTitle";
import { ReactNode, Suspense } from "react";

export default async function SurveyLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <>
      <Suspense fallback={"로딩중.."}>{children}</Suspense>
    </>
  );
}
