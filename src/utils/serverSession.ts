import { cookies } from "next/headers";

export const serverSession = () => {
  const cookieStore = cookies();
  const token = cookieStore.get("refreshToken")?.value;
  return token;
};
