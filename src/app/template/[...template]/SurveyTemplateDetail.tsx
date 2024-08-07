import { fetchTemplateDetail } from "@/app/_services/surveySerivce";
import { TemplateUnionType } from "@/app/template/[...template]/page";
import { surveyDetailProps } from "@/types/templateSurvey";

export default async function SurveyTemplateDetail({
  templateType,
  surveyId,
}: {
  templateType: TemplateUnionType;
  surveyId: number;
}) {
  const surveyItem = await fetchTemplateDetail<surveyDetailProps>(
    templateType,
    surveyId
  );
  console.log(surveyItem);

  return <>sss</>;
}
