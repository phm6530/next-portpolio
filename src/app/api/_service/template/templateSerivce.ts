import { insertQuestion } from "@/app/api/_dao/template/SurveyRepository";

import { getTemplateId } from "@/app/lib/utilFunc";
import { withConnection, withTransition } from "@/app/lib/helperServer";
import { AddSurveyFormProps } from "@/types/templateSurvey";
import {
  insertTemplateMeta,
  selectTemplateList,
} from "@/app/api/_dao/template/templateRepository";
import { templateMetaProps } from "@/types/template";

//template Post Service
export async function postAddTemplate(
  data: AddSurveyFormProps & templateMetaProps
) {
  const { title, description, items, template, imgKey } = data;

  //템플릿 ID Get
  const template_id = getTemplateId(template) as number;

  //meta Post
  await withTransition(async (conn) => {
    const templateMetaData = { template_id, title, description, imgKey };

    //save metaData
    const savedMeta = await insertTemplateMeta(conn, templateMetaData);

    //save Questions
    await insertQuestion(conn, items, savedMeta.insertId);
  });
}

//template Get Service
export async function getTemplateList(page: number = 1) {
  return withConnection(async (conn) => {
    return selectTemplateList(conn, page);
  });
}
