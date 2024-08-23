import { AddSurveyFormProps, SurveyRadioProps } from "@/types/templateSurvey";
import { PoolConnection, ResultSetHeader } from "mysql2/promise";

//survey List  Insert
export const insertQuestion = async (
  conn: PoolConnection,
  items: AddSurveyFormProps["items"],
  templateMetaId: number
) => {
  for (const item of items) {
    const { label, type, options } = item;

    const sql = `
        INSERT INTO 
            survey_question (question_type_id , label , template_meta_id , text_picture) 
        VALUES(? ,? , ?, ? );
    `;

    const [rows] = await conn.execute<ResultSetHeader>(sql, [
      type,
      label,
      templateMetaId,
      "textImg" in item ? item.textImg : null,
    ]);

    //객관식이면 옵션 추가 반영하게 함
    if (type === "select") {
      const ID_question = rows.insertId;

      for (const option of options as SurveyRadioProps["options"]) {
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
