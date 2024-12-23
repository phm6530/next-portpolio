import {
  AddSurveyFormProps,
  SurveyOptionItemProps,
} from "@/types/templateSurvey";
import { PoolConnection, ResultSetHeader, RowDataPacket } from "mysql2/promise";

// 응답 갯수 가져오기
export const selectTextCnt = async (
  conn: PoolConnection,
  templateId: string,
  questionId: string
): Promise<RowDataPacket> => {
  const [count] = await conn.query<RowDataPacket[]>(
    `   SELECT count(*) as cnt FROM survey_answers as sa 
        join 
            survey_question as sq ON sq.id = sa.question_id 
        where 
            sa.template_meta_id = ? AND sq.id = ? ;
        `,
    [templateId, questionId]
  );

  return count[0];
};

export const insertCreateUser = async (
  conn: PoolConnection,
  template_id: number,
  user: {
    user_id: string;
    user_name: string;
    user_nickname: string;
    role: string;
  }
) => {
  const [result] = await conn.query(
    `
      INSERT INTO user_made_template(user_id , template_id) values(? , ?)
  `,
    [user.user_id, template_id]
  );
  return result;
};

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

      for (const option of options as SurveyOptionItemProps["options"]) {
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
