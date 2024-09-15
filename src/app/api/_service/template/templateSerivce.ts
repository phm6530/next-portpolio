import {
  insertCreateUser,
  insertQuestion,
} from "@/app/api/_dao/template/SurveyRepository";

import { getTemplateId } from "@/util/utilFunc";
import { withConnection, withTransaction } from "@/util/server/serverUtill";
import { RequestSurveyFormProps } from "@/types/templateSurvey";
import {
  insertAnonymous,
  insertTemplateMeta,
  selectTemplateMetaData,
} from "@/app/api/_dao/template/templateRepository";

import { RowDataPacket } from "mysql2";
import { CONST_PAGING } from "@/types/constans";
import { sendEmail } from "@/lib/nodeMailer";
import {
  GetTemplateDetail,
  GetTemplateDetailMetaProps,
} from "@/types/template";
import { ApiError } from "@/util/apiErrorHandler";
import { auth } from "@/auth";

//template Post Service
export async function postUser(data: RequestSurveyFormProps) {
  const { items, template, template_key, ...rest } = data;

  //템플릿 ID Get
  const template_type_id = getTemplateId(template) as number;

  //meta Post
  await withTransaction(async (conn) => {
    //save metaData
    const savedMeta = await insertTemplateMeta(conn, {
      template_type_id,
      template_key,
      ...rest,
    });

    //세션가드
    const session = await auth();
    if (!session) {
      throw new ApiError("세션이 만료되었습니다.", 503);
    }

    //User templateMade Insert Data
    await insertCreateUser(conn, savedMeta.insertId, session.user);

    //save Questions
    await insertQuestion(conn, items, savedMeta.insertId);
  });
}

//template Post Service
export async function postAnonymouse(data: RequestSurveyFormProps) {
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

    //save Questions
    await insertQuestion(conn, items, savedMeta.insertId);

    //email + Pin 저장
    await insertAnonymous(
      conn,
      restData.access_email as string,
      restData.access_email_agreed as boolean,
      restData.access_pin as number,
      savedMeta.insertId
    );

    //메일 책임 트랜지션으로 전가
    await sendEmail(
      restData.access_email as string,
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
        (acc: GetTemplateDetail[], cur: GetTemplateDetailMetaProps) => {
          const { start_date, end_date, ...rest } = cur;
          const newCur: GetTemplateDetail = {
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
