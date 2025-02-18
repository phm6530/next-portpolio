import CreateSurveyForm from "./survey/CreateSurvey";
import { TEMPLATE_TYPE } from "@/types/template.type";

type MadeTemplateParams = {
  params: { madeType: [TEMPLATE_TYPE] };
};

export default function MadeTemplate({ params }: MadeTemplateParams) {
  const [template] = params.madeType;

  // //설문
  if (template === TEMPLATE_TYPE.SURVEY) {
    return <CreateSurveyForm />;
  }

  //Rank
  if (template === TEMPLATE_TYPE.RANK) {
    return <></>;
  } else {
  }
}
