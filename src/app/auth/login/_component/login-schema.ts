import { z } from "zod";

export const loginSchema = z.object({
  password: z
    .string()
    .min(4, { message: "비밀번호는 최소 4글자 이상이어야 합니다." }),
  email: z.string().email("올바른 이메일주소 형식이 아닙니다."),
});
