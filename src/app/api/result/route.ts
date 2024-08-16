import { selectTemplateMetaData } from "@/app/api/_dao/template/templateRepository";
import { selectTemplateResult } from "@/app/api/_dao/template/templateRepository";
import { apiErrorHandler } from "@/app/lib/apiErrorHandler";
import { withTransaction } from "@/app/lib/helperServer";
import { Gender } from "@/types/template";
import { ResultQuestion } from "@/types/templateSurvey";
import { PoolConnection } from "mysql2/promise";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;

    // TemplateId
    const templateId = searchParams.get("templateId");
    if (!templateId || !!isNaN(Number(templateId))) {
      throw new Error("잘못된 경로 ...");
    }

    //Transtion
    const { data, templateMeta } = await withTransaction(async (conn) => {
      //Detail
      const data = await selectTemplateResult(conn, templateId);
      //페이징 파라미터
      const parameter: {
        conn: PoolConnection;
        usePagination: boolean;
        template_id?: number;
      } = {
        conn,
        usePagination: false, // 페이징 네이션 on
        template_id: +templateId,
      };
      const templateMeta = await selectTemplateMetaData(parameter);
      return { data, templateMeta };
    });

    const questionList = data.reduce<{ questions: ResultQuestion[] }>(
      (acc, cur) => {
        const {
          option_idx,
          option_label,
          option_pictrue,
          question,
          question_id,
          total_participants,
          type, // select | text
          text_answer, //text Answer
          ...rest
        } = cur;

        // 현재 question_id에 해당하는 질문이 이미 acc.questions에 있는지 확인
        let questionEntry = acc.questions.find((e) => e.id === question_id);

        //gender + age 추출
        const gender_age = Object.keys({ ...rest });
        const value = Object.values({ ...rest });

        if (!questionEntry) {
          // 만약 없으면 새로 추가
          questionEntry = {
            id: question_id,
            question,
            type,
          };

          questionEntry =
            type === "text"
              ? { ...questionEntry, values: [] }
              : { ...questionEntry, options: [] };

          //tempalte metaData Push..
          acc.questions.push(questionEntry);
        }

        if (type === "text") {
          const target = gender_age.find((_, idx) => {
            return value[idx] === "1";
          });
          const [gender, age] = target?.split("_") as [Gender, string];

          questionEntry.values?.push({
            gender,
            age: +age.slice(0, -1) as 10 | 20 | 30 | 40 | 50 | 60,
            value: text_answer,
          });

          return acc;
        } else {
          // // 해당 question에 option 추가
          questionEntry.options &&
            questionEntry.options.push({
              idx: option_idx, // 옵션 매핑 기준
              label: option_label,
              picture: option_pictrue,
              user: {
                female: {
                  "10s": 0,
                  "20s": 0,
                  "30s": 0,
                  "40s": 0,
                  "50s": 0,
                  "60s": 0,
                },
                male: {
                  "10s": 0,
                  "20s": 0,
                  "30s": 0,
                  "40s": 0,
                  "50s": 0,
                  "60s": 0,
                },
              },
            });

          gender_age.forEach((e, idx) => {
            const [gender, age] = e.split("_") as ["male" | "female", string];

            if (questionEntry.options) {
              const option = questionEntry.options.find(
                (opt) => opt.idx === option_idx
              );
              if (option && option.user[gender]) {
                option.user[gender][age as string] = value[idx];
              }
            }
          });

          return acc;
        }
      },
      { questions: [] } //initale
    );

    return NextResponse.json({ templateResult: questionList, templateMeta });
  } catch (error) {
    return apiErrorHandler(error);
  }
}
