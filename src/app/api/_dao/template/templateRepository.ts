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

export const selectTemplateList = async (
  conn: PoolConnection,
  page: number
) => {
  const offset = (page - 1) * CONST_PAGING.LIMIT;

  const sql = `
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
        ORDER BY 
            tm.id DESC 
        LIMIT ? OFFSET ?;`;
  const [row] = await conn.query<RowDataPacket[]>(sql, [
    CONST_PAGING.LIMIT,
    offset,
  ]);
  return row;
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

export async function selectTotalCnt(
  conn: PoolConnection,
  id: string
): Promise<RowDataPacket> {
  const sql = `SELECT COUNT(*) as user_cnt FROM participants_recodes WHERE template_id = ?`;
  const [rows] = await conn.query<RowDataPacket[]>(sql, [id]);
  return rows[0];
}
