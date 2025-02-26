import { TEMPLATE_TYPE } from "@/types/template.type";
import CreateSurveyForm from "./survey/CreateSurvey";

type MadeTemplateParams = {
  params: { madeType: [TEMPLATE_TYPE] };
};

export default function MadeTemplate({ params }: MadeTemplateParams) {
  const [template] = params.madeType;

  // Survey..
  if (template === TEMPLATE_TYPE.SURVEY) {
    return <CreateSurveyForm />;
  }

  //Rank
  if (template === TEMPLATE_TYPE.RANK) {
    return <></>;
  }
}
