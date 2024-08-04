import DefaultSurvey from "@/app/survey/template/[template]/_component/DefaultSurvey/DefaultSurvey";
import RankSurvey from "@/app/survey/template/[template]/_component/RankSurvey/RankSurvey";
import { notFound } from "next/navigation";

type TemplateProps = "default" | "rank";

export default function SelectTemplate({
  params,
}: {
  params: { template: TemplateProps };
}) {
  const template: TemplateProps = params.template;

  //기본 Survey
  if (template === "default") {
    return <DefaultSurvey />;
  }

  //Rank
  if (template === "rank") {
    return <RankSurvey />;
  }

  //10문 10답
  if (template === "rank") {
    return <RankSurvey />;
  } else {
    notFound();
  }
}
