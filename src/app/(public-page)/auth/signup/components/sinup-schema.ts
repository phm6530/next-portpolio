import { z } from "zod";
import { passwordSchema } from "../../schema";

export const nickNamezod = z
  .string()
  .min(2, "닉네임은 최소 2글자 이상이어야 합니다.")
  .max(15, "닉네임은 최대 15글자 이하여야 합니다.")
  .regex(/^[가-힣a-zA-Z0-9]+$/, "올바른 닉네임 형식이 아닙니다.");

export const signUpSchema = z
  .object({
    nickname: nickNamezod,
    email: z.string().email("유효한 이메일주소가 아닙니다."),
    password: passwordSchema,
    passwordConfirm: z
      .string()
      .min(4, "비밀번호는 최소 4글자 이상이어야 합니다."),
  })
  .refine(
    (data) => {
      if (data.password === data.passwordConfirm) {
        return true;
      }
    },
    { message: "비밀번호가 일치하지 않네요", path: ["passwordConfirm"] }
  );
