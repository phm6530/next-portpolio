import { z } from "zod";

export const passwordSchema = z
  .string()
  .min(4, "비밀번호는 최소 4글자 이상이어야 합니다.");
