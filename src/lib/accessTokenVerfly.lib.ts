import { cookies } from "next/headers";

export const accessTokenVerfly = () => {
  const cookieStore = cookies();
  const token = cookieStore.get("accessToken")?.value;
  console.log("111");
  return token;
};
