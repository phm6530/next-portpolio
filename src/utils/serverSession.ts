import { cookies } from "next/headers";

export const serverSession = (): boolean => {
  const cookieStore = cookies();
  const token = cookieStore.get("accessToken")?.value;
  return token ? true : false;
};
