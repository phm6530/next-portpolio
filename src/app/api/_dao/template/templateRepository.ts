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
  const { description, title, template_id, imgKey } = data;

  const insert_sql = `
    INSERT INTO
        template_meta( title , description , template_type_id , created_at , imgKey) 
    VALUE 
        (?,?,?,now(), ?);`;

  const [result] = await conn.execute<ResultSetHeader>(insert_sql, [
    title,
    description,
    template_id,
    imgKey,
  ]);

  return result;
};

export const selectTemplateList = async (
  conn: PoolConnection,
  page: number
) => {
  const offset = (page - 1) * 10;
  console.log(offset);

  const sql = `
        SELECT 
          tm.id, 
          tm.title,
          tm.description,
          tm.created_at,
          t.template as template
        FROM 
          template_meta tm
        JOIN 
          template t ON tm.template_type_id = t.id
        ORDER BY 
          tm.id DESC 
        LIMIT 10 OFFSET ?;`;
  const [row] = await conn.query<RowDataPacket[]>(sql, [offset]);
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
