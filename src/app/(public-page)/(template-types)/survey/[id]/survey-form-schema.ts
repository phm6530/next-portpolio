import {
  QUESTION_TYPE,
  SurveyQuestionSelect,
  SurveyTemplateDetail,
} from "@/types/survey.type";
import { z } from "zod";

//주관관
export const textAnswerSchema = z.object({
  questionId: z.number(),
  type: z.literal(QUESTION_TYPE.TEXT),
  answer: z.string().nullable(),
});

//객관
export const selectAnswerSchema = z.object({
  questionId: z.number(),
  type: z.literal(QUESTION_TYPE.SELECT),

  // id를 객체화 해서 O(1)으로 별차이없지만
  optionId: z.array(z.record(z.string(), z.number())),
});

export const createSurveyFormSchema = (
  isGenderCollected: boolean,
  isAgeCollected: boolean,
  questions: SurveyTemplateDetail["questions"]
) => {
  const baseSchema = z.object({
    ...(isGenderCollected && {
      gender: z.enum(["male", "female"] as const, {
        invalid_type_error: "필수 항목입니다.",
      }),
    }),
    ...(isAgeCollected && {
      ageGroup: z
        .number({
          invalid_type_error: "필수 항목입니다.",
        })
        .min(1, { message: "연령대를 선택해주세요" }),
    }),
  });

  return baseSchema.extend({
    answers: z
      .array(z.union([textAnswerSchema, selectAnswerSchema]))
      .superRefine((answers, ctx) => {
        const questionMap = new Map(questions.map((q) => [q.id, q]));
        // O(n)에서 O(1)Map 혹시모르니..
        answers.forEach((qs, index) => {
          const question = questionMap.get(qs.questionId);

          // 필수
          if (question?.required) {
            if (qs.type === QUESTION_TYPE.TEXT && !qs.answer) {
              ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "필수 항목입니다.",
                path: [index, "answer"],
              });
            }

            if (qs.type === QUESTION_TYPE.SELECT && !qs.optionId) {
              ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "선택형 문항은 옵션을 선택해야 합니다",
                path: [index, "optionId"],
              });
            }

            if (qs.type === QUESTION_TYPE.SELECT) {
              // 필수 chk
              if (qs.optionId.length === 0) {
                ctx.addIssue({
                  code: z.ZodIssueCode.custom,
                  message: "필수 항목입니다.",
                  path: [index, "optionId"],
                });
                return;
              }
            }
          }
        });
      }),
  });
};
