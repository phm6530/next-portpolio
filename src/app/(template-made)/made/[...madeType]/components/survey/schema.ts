import { z } from "zod";
import { QUESTION_TYPE } from "@/types/survey.type";
import { TEMPLATE_TYPE } from "@/types/template.type";

const RequestTextSchema = z.object({
  label: z.string().min(1, "질문 라벨은 필수입니다."),
  type: z.literal(QUESTION_TYPE.TEXT),
  img: z.string().nullable().optional(),
});

const RequestSelectSchema = z.object({
  label: z.string().min(1, "질문 라벨은 필수입니다."),
  type: z.literal(QUESTION_TYPE.SELECT),
  options: z
    .array(
      z.object({
        value: z.string().min(1, "옵션 값은 필수입니다."),
        type: z.literal(QUESTION_TYPE.SELECT),
        img: z.string().nullable().optional(),
      })
    )
    .min(2, "선택 옵션은 최소 2개가 필요합니다.")
    .superRefine((options, ctx) => {
      const duplicates = options
        .map((o) => o.value)
        .filter((value, index, self) => self.indexOf(value) !== index);
      if (duplicates.length > 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `중복된 옵션 값이 있습니다: ${[...new Set(duplicates)].join(
            ", "
          )}`,
        });
      }
    }),
});

const surveySchema = z.object({
  title: z
    .string()
    .min(1, "제목은 필수 입니다.")
    .min(4, "제목은 최소 4글자 이상으로 적어주세요"),
  description: z.string().min(1, "해당 조사의 설명을 적어주세요"),
  thumbnail: z
    .string()
    .nullable()
    .refine((val) => val !== null, "썸네일을 선택해주세요"),
  startDate: z.string().nullable().optional(),
  endDate: z.string().nullable().optional(),
  isGenderCollected: z.boolean().optional(),
  isAgeCollected: z.boolean().optional(),
  templateType: z.nativeEnum(TEMPLATE_TYPE),
  templateKey: z.string(),
  questions: z
    .array(z.union([RequestTextSchema, RequestSelectSchema]))
    .min(1, "질문 문항은 최소 하나이상 등록되어야 합니다."),
  creator: z.object({
    id: z.number().min(1, "사용자 ID는 필수입니다."),
    email: z.string().email("유효한 이메일 형식이어야 합니다."),
    nickname: z.string().optional(),
    role: z.string().optional(),
  }),
});

export default surveySchema;
