import { AddSurveyFormProps } from "@/types/templateSurvey";
import { PoolConnection, ResultSetHeader, RowDataPacket } from "mysql2/promise";
import { number } from "zod";

//survey List  Insert
export const insertQuestion = async (
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
