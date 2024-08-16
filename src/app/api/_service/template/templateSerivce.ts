import { insertQuestion } from "@/app/api/_dao/template/SurveyRepository";

import { getTemplateId } from "@/app/lib/utilFunc";
import { withConnection, withTransaction } from "@/app/lib/helperServer";
import { AddSurveyFormProps } from "@/types/templateSurvey";
import {
  insertTemplateMeta,
  selectTemplateMetaData,
} from "@/app/api/_dao/template/templateRepository";
import { templateMetaProps } from "@/types/template";
import { RowDataPacket } from "mysql2";
import { CONST_PAGING } from "@/types/constans";

//template Post Service
export async function postAddTemplate(
  data: AddSurveyFormProps & templateMetaProps
) {
  const { items, template, ...rest } = data;

  //템플릿 ID Get
  const template_id = getTemplateId(template) as number;

  //meta Post
  await withTransaction(async (conn) => {
    //save metaData
    const savedMeta = await insertTemplateMeta(conn, { template_id, ...rest });

    //save Questions
    await insertQuestion(conn, items, savedMeta.insertId);
  });
}

//template Get Service
export async function getTemplateList(page: number = 1) {
  return withConnection(async (conn) => {
    //List 가져올땐 True 아니면 false 하면 됨
    const offset = (page - 1) * CONST_PAGING.LIMIT;

    //페이징 파라미터
    const parameter = {
      conn,
      usePagination: true, // 페이징 네이션 on
      offset,
    };

    return selectTemplateMetaData(parameter);
  });
}

//template Get Service
export async function getTemplateAllCnt(): Promise<number> {
  return withConnection(async (conn) => {
    const sql = "select count(*) as cnt from template_meta;";
    const [templateAll] = await conn.query<RowDataPacket[]>(sql);
    return templateAll[0].cnt;
  });
}
