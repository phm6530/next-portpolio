import { TextFilter } from "@/utils/text-filter";
import { z } from "zod";

export const UserMsgSchema = z.object({
  userId: z.number().min(1, { message: "이상 현상" }),
  content: z
    .string()
    .min(1, { message: "내용을 작성해주세요" })
    .max(1000, { message: "1000자 내외로 작성해주세요" })
    .refine((title) => !TextFilter.hasBadText(title), {
      message: "내용에 부적절한 표현이 포함되어 있습니다.",
    }),
});

export const geustMsgSchema = z.object({
  anonymous: z.string().min(1, { message: "이름을 기재해주세요 " }),
  password: z.string().min(1, { message: "비밀번호를 기재해주세요" }),
  content: z
    .string()
    .min(1, { message: "내용을 작성해주세요" })
    .max(1000, { message: "1000자 내외로 작성해주세요" })
    .refine((txt) => !TextFilter.hasBadText(txt), {
      message: "부적절한 표현이 포함되어 있습니다.",
    }),
});
