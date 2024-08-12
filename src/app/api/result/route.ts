import { selectTemplateMetaData } from "@/app/api/_dao/template/templateRepository";
import { selectTemplateResult } from "@/app/api/_dao/template/templateRepository";
import { apiErrorHandler } from "@/app/lib/apiErrorHandler";
import { withTransition } from "@/app/lib/helperServer";
import { PoolConnection } from "mysql2/promise";
import { NextRequest, NextResponse } from "next/server";

interface Question {
  id: number;
  question: string;
  template_id: number;
  total_participants?: number;

  type: string;
  options?: Option[];
  values?: string[];
}

interface Option {
  idx: number;
  label: string;
  picture: string | null;
  [key: string]: any;
}

// 초기 acc의 타입 정의
interface Accumulator {
  questions: Question[];
}

interface Statistics {
  male: { [ageGroup: string]: number };
  female: { [ageGroup: string]: number };
}

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;

    // TemplateId
    const templateId = searchParams.get("templateId");
    if (!templateId || !!isNaN(Number(templateId))) {
      throw new Error("잘못된 경로 ...");
    }

    //Transtion
    const result = await withTransition(async (conn) => {
      //Detail
      const data = await selectTemplateResult(conn, templateId);

      const result = data.reduce<Accumulator>(
        (acc, cur) => {
          const {
            option_idx,
            option_label,
            option_pictrue,
            question,
            question_id,
            template_id,
            total_participants,
            type,
            value,
            ...rest
          } = cur;

          // 현재 question_id에 해당하는 질문이 이미 acc.questions에 있는지 확인
          let questionEntry = acc.questions.find((e) => e.id === question_id);

          if (!questionEntry) {
            // 만약 없으면 새로 추가
            questionEntry = {
              id: question_id,
              question,
              template_id,
              type,
            };

            questionEntry =
              type === "text"
                ? { ...questionEntry, values: [] }
                : { ...questionEntry, options: [] };

            acc.questions.push(questionEntry);
          }

          // // 해당 question에 option 추가
          questionEntry.options &&
            questionEntry.options.push({
              idx: option_idx,
              label: option_label,
              picture: option_pictrue,
              user: {},
            });

          const restUserdata = { ...rest };

          if (type === "text") {
            questionEntry.values?.push(value);
            return acc;
          } else {
            //gender + age 추출
            const gender_age = Object.keys(restUserdata);
            const value = Object.values(restUserdata);

            gender_age.forEach((e, idx) => {
              const [gender, age] = e.split("_");
              console.log(gender, +age.slice(0, -1), value[idx]);
            });

            return acc;
          }
        },

        { questions: [] } //initale
      );

      // console.log(result);

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
      return { newRestData: result, templateMeta };
    });

    console.log(result.newRestData.questions);

    return NextResponse.json({ result });
  } catch (error) {
    return apiErrorHandler(error);
  }
}
