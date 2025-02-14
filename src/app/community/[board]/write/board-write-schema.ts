import { z } from "zod";

// 유저
export const baseSchema = z.object({
  title: z.string().min(1, "제목은 필수 항목입니다."),
  contents: z.string().min(1, "내용은 필수 항목입니다."),
});

// 익명일 때
export const anonymousSchema = baseSchema.extend({
  anonymous: z.string().min(2, "글쓴이는 최소 2글자 이상이여야 합니다"),
  password: z.string().min(4, "비밀번호는 최소 4자리 이상이어야 합니다."),
});

export const boardWirteSchema = z.union([baseSchema, anonymousSchema]);
