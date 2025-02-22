import { z } from "zod";

const BaseMsgSchema = z.object({
  content: z.string().min(1, { message: "필수 항목 입니다." }),
});

export const UserMsgSchema = BaseMsgSchema.extend({
  userId: z.number().min(1, { message: "이상 현상" }),
});

export const geustMsgSchema = BaseMsgSchema.extend({
  anonymous: z.string().min(1, { message: "필수 항목 입니다." }),
  password: z.string().min(1, { message: "필수 항목 입니다." }),
});
