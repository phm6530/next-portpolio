import { selectTemlateDetail } from "@/app/api/_dao/template/templateRepository";
import { withConnection } from "@/app/lib/helperServer";
import { templateItemProps, TemplateProps } from "@/types/template";
import {
  InferSurveyType,
  surveyDetailProps,
  SurveyType,
} from "@/types/templateSurvey";

//return 값
type RowDataSurvey = {
  id: number;
  title: string;
  description: string;
  template: TemplateProps;
  created_at: string;
  question_id: number;
  question_type_id: InferSurveyType<SurveyType>;
  question_label: string;
  option_id: number | null;
  option_idx: number | null;
  option_label: string | null;
  option_value: string | null;
  option_pictrue: string | null;
};

export async function getSurveyDetail(
  DetailId: string
): Promise<surveyDetailProps> {
  const rowData = await withConnection<RowDataSurvey[]>(async (conn) => {
    return selectTemlateDetail(conn, DetailId) as Promise<RowDataSurvey[]>;
  });

  //Meta Data
  const metaData: templateItemProps = {
    id: rowData[0].id,
    title: rowData[0].title,
    description: rowData[0].description,
    created_at: rowData[0].created_at,
    template: rowData[0].template,
  };

  const questionMade = () => {
    const arr: surveyDetailProps["questions"] = [];

    rowData.forEach((q) => {
      // 같은 Id는 Push 안 함

      if (!arr.find((e) => e.id === q.question_id)) {
        const initalQa = {
          id: q.question_id,
          label: q.question_label,
          type: q.question_type_id,
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

  const resultData: surveyDetailProps = {
    ...metaData,
    questions: questionMade(),
  };
  // console.log(returnData);

  return resultData;
}
