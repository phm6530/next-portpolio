import { z } from "zod";

export const UserMsgSchema = z.object({
  userId: z.number().min(1, { message: "이상 현상" }),
  content: z
    .string()
    .min(1, { message: "내용을 작성해주세요" })
    .max(1000, { message: "1000자 내외로 작성해주세요" }),
});

export const geustMsgSchema = z.object({
  anonymous: z.string().min(1, { message: "이름을 기재해주세요 " }),
  password: z.string().min(1, { message: "비밀번호를 기재해주세요" }),
  content: z
    .string()
    .min(1, { message: "내용을 작성해주세요" })
    .max(1000, { message: "1000자 내외로 작성해주세요" }),
});
