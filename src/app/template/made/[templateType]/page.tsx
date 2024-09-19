import CreateSurvey from "@/app/template/made/[templateType]/_page/CreateSurvey";
import RankSurvey from "@/app/template/made/[templateType]/_component/RankSurvey/RankSurvey";

import { surveyParams } from "@/types/templateSurvey";
import { notFound } from "next/navigation";
import { queryClient } from "@/config/queryClient";
import { withFetch } from "@/util/clientUtil";
import { auth } from "@/auth";
import { BASE_URL } from "@/config/base";

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
          return fetch(`${BASE_URL}`);
        }),
    });
  }

  const session = await auth();

  //기본 Survey Page
  if (template === "survey") {
    return <CreateSurvey template={template} session={session} />;
  }

  //Rank
  if (template === "rank") {
    return <RankSurvey />;
  } else {
    //기타 Error 처리
    notFound();
  }
}
