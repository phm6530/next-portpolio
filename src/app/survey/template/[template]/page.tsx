import DefaultSurveyPage from "@/app/survey/template/[template]/_component/DefaultSurvey/DefaultSurveyPage";
import RankSurvey from "@/app/survey/template/[template]/_component/RankSurvey/RankSurvey";
import { notFound } from "next/navigation";

type TemplateProps = "default" | "rank";

export default function SelectTemplate({
  params,
}: {
  params: { template: TemplateProps };
}) {
  const template: TemplateProps = params.template;

  //기본 Survey Page
  if (template === "default") {
    return <DefaultSurveyPage />;
  }

  //Rank
  if (template === "rank") {
    return <RankSurvey />;
  } else {
    //기타 Error 처리
    notFound();
  }
}
