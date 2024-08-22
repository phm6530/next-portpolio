import { insertQuestion } from "@/app/api/_dao/template/SurveyRepository";

import { getTemplateId } from "@/app/lib/utilFunc";
import { withConnection, withTransaction } from "@/app/lib/helperServer";
import {
  AddSurveyFormProps,
  RequestSurveyFormProps,
} from "@/types/templateSurvey";
import {
  insertAnonymous,
  insertTemplateMeta,
  selectTemplateMetaData,
} from "@/app/api/_dao/template/templateRepository";

import { RowDataPacket } from "mysql2";
import { CONST_PAGING } from "@/types/constans";
import { sendEmail } from "@/app/lib/nodeMailer";
import {
  GetTemplateDetail,
  SelectTEmplateDetailProps,
  templateItemProps,
} from "@/types/template";
import { ApiError } from "@/app/lib/apiErrorHandler";

//template Post Service
export async function postAddTemplate(data: RequestSurveyFormProps) {
  const { items, template, template_key, ...rest } = data;

  //템플릿 ID Get
  const template_type_id = getTemplateId(template) as number;
  const restData = { ...rest };

  //meta Post
  await withTransaction(async (conn) => {
    //save metaData
    const savedMeta = await insertTemplateMeta(conn, {
      template_type_id,
      template_key,
      ...rest,
    });

    //email + Pin 저장
    await insertAnonymous(
      conn,
      restData.access_email,
      restData.access_email_agreed,
      restData.access_pin!,
      savedMeta.insertId
    );

    //save Questions
    await insertQuestion(conn, items, savedMeta.insertId);

    //메일 책임 트랜지션으로 전가
    await sendEmail(
      restData.access_email,
      template_key,
      restData.title,
      savedMeta.insertId,
      template,
      restData.access_pin
    );
  });
}

//template Get Service
export async function getTemplateList(
  page: number,
  search?: string | null,
  sort?: string | null
) {
  return withConnection(async (conn) => {
    //List 가져올땐 True 아니면 false 하면 됨
    const offset = (page - 1) * CONST_PAGING.LIMIT;

    //페이징 파라미터
    const parameter = {
      conn,
      usePagination: true, // 페이징 네이션 on
      offset,
    };

    const result = await selectTemplateMetaData(parameter, search, sort);

    if (Array.isArray(result)) {
      const reducedResult = result.reduce(
        (acc: GetTemplateDetail[], cur: SelectTEmplateDetailProps) => {
          const { start_date, end_date, ...rest } = cur;
          const newCur = {
            ...rest,
            dateRange: [start_date, end_date],
          };
          acc.push(newCur);
          return acc;
        },
        []
      );

      return reducedResult;
    } else {
      throw new ApiError("잘못된 요청입니다.", 401);
    }
  });
}

//template Get Service
export async function getTemplateAllCnt(
  search: string | null,
  sort: string | null
): Promise<number> {
  return withConnection(async (conn) => {
    //검색 유무
    const sql = search
      ? `select count(*) as cnt from template_meta where template_meta.title like ?;`
      : "select count(*) as cnt from template_meta;";

    const keyWord = `%${search}%`;

    const [templateAll] = await conn.query<RowDataPacket[]>(sql, [keyWord]);
    return templateAll[0].cnt;
  });
}
