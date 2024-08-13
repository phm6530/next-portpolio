import { InferObj } from "@/types/common";
import { CONST_PAGING } from "@/types/constans";
import { AddSurveyFormProps } from "@/types/templateSurvey";
import { PoolConnection, ResultSetHeader, RowDataPacket } from "mysql2/promise";

//Meta Data Post
export const insertTemplateMeta = async (
  conn: PoolConnection,
  data: Omit<AddSurveyFormProps, "items"> & {
    template_id: number;
    imgKey: string;
  }
): Promise<ResultSetHeader> => {
  const { description, title, template_id, imgKey, genderChk, ageChk } = data;

  const insert_sql = `
    INSERT INTO
        template_meta( title , description , template_type_id , created_at , imgKey , gender_chk , age_chk) 
    VALUE 
        (?,?,?,now(), ?, ? , ?);`;

  const [result] = await conn.execute<ResultSetHeader>(insert_sql, [
    title,
    description,
    template_id,
    imgKey,
    genderChk,
    ageChk,
  ]);

  return result;
};

//true
type TruePageNation = {
  offset?: number;
};

//false
type FalsePageNation = {
  template_id?: number;
};

//Meta
type GetTemplateMeta = {
  conn: PoolConnection;
  usePagination: boolean;
};

export const selectTemplateMetaData = async (
  props: GetTemplateMeta & (TruePageNation | FalsePageNation)
): Promise<RowDataPacket[] | RowDataPacket> => {
  const { conn, usePagination } = props;

  let sql = `
    SELECT 
        tm.id, 
        tm.title,
        tm.description,
        tm.created_at,
        t.template AS template,
        pr_stats.age_group,
        pr_stats.gender as gender_group,
        pr_stats.total_cnt
    FROM 
        template_meta tm
    JOIN 
        template t ON tm.template_type_id = t.id
    LEFT JOIN (
        SELECT 
            pr.template_id,
            pr.age_group,
            pr.gender,
            (SELECT COUNT(*) FROM participants_recodes WHERE template_id = pr.template_id) AS total_cnt,
            ROW_NUMBER() OVER (PARTITION BY pr.template_id ORDER BY COUNT(*) DESC) AS rn
        FROM 
            participants_recodes pr
        GROUP BY 
            pr.template_id, pr.age_group, pr.gender
    ) pr_stats ON tm.id = pr_stats.template_id AND pr_stats.rn = 1
  `;

  let queryParams: (number | undefined)[] = [];

  if (usePagination) {
    const { offset = 0 } = props as TruePageNation;

    const limit = CONST_PAGING.LIMIT;
    sql += ` ORDER BY tm.id DESC LIMIT ? OFFSET ?`;
    queryParams.push(limit, offset);
  } else {
    const { template_id } = props as FalsePageNation;
    if (template_id) {
      sql += ` WHERE tm.id = ?`;
      queryParams.push(template_id);
    }
  }

  const [rows] = await conn.query<RowDataPacket[]>(sql, queryParams);
  return usePagination ? rows : rows[0];
};

//Detail Return;
export const selectTemlateDetail = async (
  conn: PoolConnection,
  page: string
): Promise<RowDataPacket[]> => {
  const sql = `
    SELECT 
      tm.id,
      tm.title,
      tm.description,
      t.template,
      tm.gender_chk,
      tm.age_chk,
      tm.created_at,
      sq.id AS question_id,
      sq.question_type_id,
      sq.label AS question_label,
      so.id AS option_id,
      so.idx AS option_idx,
      so.label AS option_label,
      so.value AS option_value,
      so.option_pictrue
    FROM 
        template_meta tm
    JOIN 
        template t ON tm.template_type_id = t.id
    LEFT JOIN 
        survey_question sq ON sq.template_meta_id = tm.id
    LEFT JOIN 
        survey_options so ON so.question_id = sq.id
    WHERE 
        tm.id = ?
    ORDER BY 
        sq.id, so.idx;
    `;

  const [rows] = await conn.query<RowDataPacket[]>(sql, [page]);
  return rows;
};

//getDetail 사용자 수
export async function selectTotalCnt(
  conn: PoolConnection,
  id: string
): Promise<RowDataPacket> {
  const sql = `SELECT COUNT(*) as user_cnt FROM participants_recodes WHERE template_id = ?`;
  const [rows] = await conn.query<RowDataPacket[]>(sql, [id]);
  return rows[0];
}

//Detail Template 결과
export async function selectTemplateResult(
  conn: PoolConnection,
  templateId: string
) {
  const sql = `
SELECT 
    sq.id as question_id,
    sq.question_type_id as type,
    sq.label as question,
    sa.answer_value as text_answer,
    so.label as option_label,
    so.idx as option_idx,
    so.option_pictrue,

    COUNT(sa.participants_id) as total_participants,
    SUM(CASE WHEN pr.gender = 'male' AND pr.age_group = 10 THEN 1 ELSE 0 END) as male_10s,
    SUM(CASE WHEN pr.gender = 'male' AND pr.age_group = 20 THEN 1 ELSE 0 END) as male_20s,
    SUM(CASE WHEN pr.gender = 'male' AND pr.age_group = 30 THEN 1 ELSE 0 END) as male_30s,
    SUM(CASE WHEN pr.gender = 'male' AND pr.age_group = 40 THEN 1 ELSE 0 END) as male_40s,
    SUM(CASE WHEN pr.gender = 'male' AND pr.age_group = 50 THEN 1 ELSE 0 END) as male_50s,
    SUM(CASE WHEN pr.gender = 'male' AND pr.age_group = 60 THEN 1 ELSE 0 END) as male_60s,
    SUM(CASE WHEN pr.gender = 'female' AND pr.age_group = 10 THEN 1 ELSE 0 END) as female_10s,
    SUM(CASE WHEN pr.gender = 'female' AND pr.age_group = 20 THEN 1 ELSE 0 END) as female_20s,
    SUM(CASE WHEN pr.gender = 'female' AND pr.age_group = 30 THEN 1 ELSE 0 END) as female_30s,
    SUM(CASE WHEN pr.gender = 'female' AND pr.age_group = 40 THEN 1 ELSE 0 END) as female_40s,
    SUM(CASE WHEN pr.gender = 'female' AND pr.age_group = 50 THEN 1 ELSE 0 END) as female_50s,
    SUM(CASE WHEN pr.gender = 'female' AND pr.age_group = 60 THEN 1 ELSE 0 END) as female_60s

    FROM 
        survey_question as sq
    LEFT JOIN
        survey_options as so
    ON
        sq.id = so.question_id AND sq.question_type_id != 'text' -- 객관식일 때만 옵션 조인
    LEFT JOIN
        survey_answers as sa
    ON
        sq.id = sa.question_id AND (sa.answer_value = so.label OR sq.question_type_id = 'text') -- text 타입은 그대로 매칭
    LEFT JOIN
        participants_recodes as pr
    ON
        sa.participants_id = pr.id
    WHERE 
        sq.template_meta_id = ?
    GROUP BY 
        sq.id, sq.question_type_id, sq.label, sq.template_meta_id, so.idx, so.option_pictrue , sa.answer_value  , so.label
    ORDER BY 
        sq.id, so.idx;
  `;
  const [rows] = await conn.query<RowDataPacket[]>(sql, [templateId]);
  return rows;
}
