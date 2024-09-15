import bcrypt from "bcrypt";

export const bcryptHash = async (text: string) => {
  return bcrypt.hash(text, 10);
};
