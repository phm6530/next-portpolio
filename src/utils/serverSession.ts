"use server";

import { cookies } from "next/headers";

export const serverSession = async () => {
  const cookieStore = cookies();
  const token = cookieStore.get("token")?.value;
  console.log(token);

  return token;
};
