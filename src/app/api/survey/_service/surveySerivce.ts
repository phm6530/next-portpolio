import {
  postQuestion,
  postTemplateMeta,
} from "@/app/api/survey/_dao/SurveyRepository";
import { getTemplateId } from "@/app/lib/utilFunc";
import { withTransition } from "@/app/lib/withConnect";
import { AddSurveyFormProps, templateMetaProps } from "@/types/survey";

//Survey Post Service
export async function surveyService(
  data: AddSurveyFormProps & templateMetaProps
) {
  const { title, description, items, template } = data;

  //템플릿 ID Get
  const template_id = getTemplateId(template) as number;

  //meta Post
  await withTransition(async (conn) => {
    const templateMetaData = { template_id, title, description };

    //save metaData
    const savedMeta = await postTemplateMeta(conn, templateMetaData);

    //save Questions
    await postQuestion(conn, items, savedMeta.insertId);
  });
}
