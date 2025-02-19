import { QUESTION_TYPE } from "@/types/survey.type";
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
  optionId: z.number().nullable(),
});

export const createSurveyFormSchema = (
  isGenderCollected: boolean,
  isAgeCollected: boolean
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
        answers.forEach((qs, index) => {
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
        });
      }),
  });
};
