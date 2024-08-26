import { selectTemlateDetail } from "@/app/api/_dao/template/templateRepository";
import { withConnection, withTransaction } from "@/app/lib/helperServer";
import { InferObj } from "@/types/common";
import {
  PostAddsurveyDetailProps,
  SurveyType,
  TemplateTypeProps,
  GetQuestionMetaProps,
} from "@/types/template";
import {
  AddsurveyDetailProps,
  GetSurveyDetailProps,
  GetSurveyQuestions,
} from "@/types/templateSurvey";
import { ResultSetHeader } from "mysql2";

//Data Base ROWS 타입
type RowDataSurvey = {
  id: number;
  title: string;
  description: string;
  template: TemplateTypeProps;
  gender_chk: number;
  age_chk: number;
  created_at: string;
  template_key: string;
  thumbnail: string | null;

  user_nickname: string;
  user_id: string;
  user_role: "admin" | "user" | "anonymous";

  start_date: string | null;
  end_date: string | null;

  text_picture: string | null;

  question_id: number;
  question_type_id: InferObj<SurveyType>;
  question_label: string;

  option_id: number | null;
  option_idx: number | null;
  option_label: string | null;
  option_value: string | null;
  option_pictrue: string | null;
};

export async function getSurveyDetail(
  DetailId: string
): Promise<GetSurveyDetailProps> {
  const rowData = await withConnection<RowDataSurvey[]>(async (conn) => {
    return selectTemlateDetail(conn, DetailId) as Promise<RowDataSurvey[]>;
  });

  console.log(rowData);

  //Meta Data
  const metaData: GetQuestionMetaProps = {
    id: rowData[0].id,
    title: rowData[0].title,
    description: rowData[0].description,
    created_at: rowData[0].created_at,
    template: rowData[0].template,
    template_key: rowData[0].template_key,

    //유저
    user_nickname: rowData[0].user_nickname,
    user_id: rowData[0].user_id,
    user_role: rowData[0].user_role,

    thumbnail: rowData[0].thumbnail,
    dateRange:
      rowData[0].start_date && rowData[0].end_date
        ? [rowData[0].start_date, rowData[0].end_date] // 둘 다 string인 경우
        : [null, null], // 둘 다 null인 경우

    //Template Option 여부
    templateOption: {
      genderChk: rowData[0].gender_chk === 1 ? "1" : "0",
      ageChk: rowData[0].age_chk === 1 ? "1" : "0",
    },
  };

  const getQuestions = () => {
    const arr: GetSurveyQuestions["questions"] = [];

    rowData.forEach((q) => {
      // 같은 Id는 Push 안 함

      if (!arr.find((e) => e.id === q.question_id)) {
        const initalQa = {
          id: q.question_id,
          label: q.question_label,
          type: q.question_type_id,
          textImg: q.text_picture ?? null,
          ...(q.question_type_id === "select" && { options: [] }),
        };
        arr.push(initalQa);
      }

      if (q.question_type_id === "select") {
        const lastIdx = arr.length - 1;
        arr[lastIdx].options!.push({
          optionId: q.option_id as number,
          option_idx: q.option_idx as number,
          label: q.option_label as string,
          value: q.option_value as string,
          optionPictrue: q.option_pictrue,
        });
      }
    });

    return arr;
  };

  const resultData: GetSurveyDetailProps = {
    ...metaData,
    questions: getQuestions(),
  };
  return resultData;
}

//Post Detail Answer
export async function postSurveyDetail(
  data: PostAddsurveyDetailProps,
  DetailId: string
) {
  const { surveyId, gender, ageGroup, ...rest } = data;
  return withTransaction<ResultSetHeader>(async (conn) => {
    //참여자 Insert Return값은 Id
    const insertUser_Sql = `
      INSERT INTO 
          participants_recodes 
          (gender, age_group , template_id) 
      VALUES
        (? , ? , ?);
    `;

    //query의 제네릭은 쿼리 결과 타입을 나타냄
    //[row]의 타입은 resultSetHeader와 FieldPacket[] 임
    const [insertUser] = await conn.query<ResultSetHeader>(insertUser_Sql, [
      gender,
      ageGroup,
      DetailId,
    ]);
    const Questionkeys = Object.keys({ ...rest });
    const question = { ...rest };

    const answerValues = Questionkeys.map((_) => `( ?, ?, ?, ? ) `).join(", ");

    const insertAnswer_Sql = `
      INSERT INTO survey_answers
        (template_meta_id, question_id, participants_id, answer_value)
      VALUES ${answerValues};
    `;

    const test = Questionkeys.reduce((acc, key) => {
      acc.push(DetailId, key, insertUser.insertId, question[key]);
      return acc;
    }, [] as any[]);

    const [result] = await conn.query<ResultSetHeader>(insertAnswer_Sql, [
      ...test,
    ]);
    return result;
  });
}
