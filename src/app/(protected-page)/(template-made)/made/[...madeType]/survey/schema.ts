import { z } from "zod";
import { QUESTION_TYPE } from "@/types/survey.type";
import { TEMPLATE_TYPE } from "@/types/template.type";
import { TextFilter } from "@/utils/text-filter";

const RequestTextSchema = z.object({
  label: z.string().min(1, "질문 제목은 필수입니다"),
  type: z.literal(QUESTION_TYPE.TEXT),
  required: z.boolean().default(true),
  img: z.string().nullable().optional(),
});

const RequestSelectSchema = z.object({
  label: z.string().min(1, "질문 제목은 필수입니다"),
  type: z.literal(QUESTION_TYPE.SELECT),
  multi_select: z.boolean().default(false), // 다중 선택,
  required: z.boolean().default(true),
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
      // 값 중복 확인을 위한 맵 생성
      const valueMap = new Map();

      options.forEach((option, index) => {
        const value = option.value.trim();

        if (value !== "") {
          if (valueMap.has(value)) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: `중복된 항목입니다.`,
              path: [index, "value"], // 정확한 중복 옵션의 경로 지정
            });
          } else {
            valueMap.set(value, index);
          }
        }
      });
    }),
});

const surveySchema = z.object({
  title: z
    .string()
    .min(1, "제목은 필수 입니다.")
    .min(4, "제목은 최소 4글자 이상으로 적어주세요")
    .refine((txt) => !TextFilter.hasBadText(txt), {
      message: "부적절한 표현이 포함되어 있습니다.",
    }),
  description: z
    .string()
    .min(1, "해당 조사의 설명을 적어주세요")
    .refine((txt) => !TextFilter.hasBadText(txt), {
      message: "부적절한 표현이 포함되어 있습니다.",
    }),
  thumbnail: z.string().nullable(), // Null 허용..
  startDate: z.date().nullable().optional(),
  endDate: z.date().nullable().optional(),
  isGenderCollected: z.boolean().optional(),
  isAgeCollected: z.boolean().optional(),
  templateType: z.nativeEnum(TEMPLATE_TYPE),
  templateKey: z.string().min(1, "templateKey가 생성되지 않았습니다."),
  questions: z
    .array(z.union([RequestTextSchema, RequestSelectSchema]))
    .refine((questions) => questions.length > 0, {
      message: "질문 문항은 최소 하나이상 등록되어야 합니다.",
      path: ["root"], // question root로 고정
    }),
  creator: z.object({
    id: z.number().min(1, "사용자 ID는 필수입니다."),
    email: z.string().email("유효한 이메일 형식이어야 합니다."),
    nickname: z.string().optional(),
    role: z.string().optional(),
  }),
});

export default surveySchema;
