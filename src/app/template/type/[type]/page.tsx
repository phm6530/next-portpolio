import DefaultSurveyPage from "@/app/template/type/[type]/_component/DefaultSurvey/DefaultSurveyPage";
import RankSurvey from "@/app/template/type/[type]/_component/RankSurvey/RankSurvey";
import { surveyParams } from "@/types/templateSurvey";
import { notFound } from "next/navigation";

export default function SelectTemplate({ params }: { params: surveyParams }) {
  const template = params.type;

  //기본 Survey Page
  if (template === "survey") {
    return <DefaultSurveyPage template={template} />;
  }

  //Rank
  if (template === "rank") {
    return <RankSurvey />;
  } else {
    //기타 Error 처리
    notFound();
  }
}