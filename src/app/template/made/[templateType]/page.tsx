import SurveyPage from "@/app/template/made/[templateType]/_component/Survey/SurveyPage";
import RankSurvey from "@/app/template/made/[templateType]/_component/RankSurvey/RankSurvey";

import { surveyParams } from "@/types/templateSurvey";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { queryClient } from "@/app/config/queryClient";
import { withFetch } from "@/app/lib/helperClient";
import { auth } from "@/auth";

export const metadata: Metadata = {
  title: "나만의 설문조사를 만들어보세요",
  description: "익명의 장점을 살려 물어보기 어려웠던 정보를 공유해보세요!",
};

export default async function SelectTemplate({
  params,
  searchParams,
}: {
  params: surveyParams;
  searchParams?: { edit: string }; //template_key
}) {
  const template = params.templateType;

  //수정일때만 데이터 패칭해오기
  if (searchParams?.edit) {
    await queryClient.prefetchQuery({
      queryKey: ["edit"],
      queryFn: () =>
        withFetch(async () => {
          return fetch(`${process.env.NEXT_PUBLIC_BASE_URL}`);
        }),
    });
  }

  const session = await auth();

  //기본 Survey Page
  if (template === "survey") {
    return <SurveyPage template={template} session={session} />;
  }

  //Rank
  if (template === "rank") {
    return <RankSurvey />;
  } else {
    //기타 Error 처리
    notFound();
  }
}
