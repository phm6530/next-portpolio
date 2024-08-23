import SurveyPage from "@/app/template/made/[templateType]/_component/Survey/SurveyPage";
import RankSurvey from "@/app/template/made/[templateType]/_component/RankSurvey/RankSurvey";

import { surveyParams } from "@/types/templateSurvey";
import { notFound } from "next/navigation";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "나만의 설문조사를 만들어보세요",
  description: "익명의 장점을 살려 물어보기 어려웠던 정보를 공유해보세요!",
};

export default function SelectTemplate({ params }: { params: surveyParams }) {
  const template = params.templateType;

  //기본 Survey Page
  if (template === "survey") {
    return <SurveyPage template={template} />;
  }

  //Rank
  if (template === "rank") {
    return <RankSurvey />;
  } else {
    //기타 Error 처리
    notFound();
  }
}
