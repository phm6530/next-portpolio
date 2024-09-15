import bcrypt from "bcrypt";

export async function comparePassword(
  getPassword: string,
  password: string
): Promise<boolean> {
  if (!getPassword || !password) {
    throw new Error("비밀번호 또는 저장된 비밀번호가 없습니다.");
  }

  const result = await bcrypt.compare(password, getPassword);
  if (result === false) {
    throw new Error("비밀번호가 일치하지 않습니다.");
  }

  return result;
}
