import { AddSurveyFormProps } from "@/types/survey";
import { PoolConnection, ResultSetHeader, RowDataPacket } from "mysql2/promise";

interface TemplateMeta extends RowDataPacket {
  id: number;
}

//Meta Data Post
export const postTemplateMeta = async (
  conn: PoolConnection,
  data: Omit<AddSurveyFormProps, "items"> & { template_id: number }
): Promise<ResultSetHeader> => {
  const { description, title, template_id } = data;

  const insert_sql = `
    INSERT INTO
        template_meta( title , description , template_id , created_at ) 
    VALUE 
        (?,?,?,now());`;

  const [result] = await conn.execute<ResultSetHeader>(insert_sql, [
    title,
    description,
    template_id,
  ]);
  return result;
};

//survey List  Insert
export const postQuestion = async (
  conn: PoolConnection,
  items: Pick<AddSurveyFormProps, "items">["items"],
  templateMetaId: number
) => {
  for (const item of items) {
    const { label, type, options } = item;

    const sql = `
        INSERT INTO 
            survey_question (question_type_id , label , template_meta_id) 
        VALUES(? ,? , ?);
    `;

    const [rows] = await conn.execute<ResultSetHeader>(sql, [
      type,
      label,
      templateMetaId,
    ]);

    if (type === "select") {
      const ID_question = rows.insertId;

      for (const option of options!) {
        const { idx, value, img } = option;

        const sql = `
          INSERT INTO 
            survey_options (question_id, label, value, idx${
              img ? ", option_pictrue" : ""
            }) 
          VALUES(?, ?, ?, ?${img ? ", ?" : ""});
        `;

        const params = img
          ? [ID_question, value, value, idx, img]
          : [ID_question, value, value, idx];

        await conn.execute<ResultSetHeader>(sql, params);
      }
    }
  }
};
