"use server";
import { revaildateTags } from "@/action/revaildate";
import { cookies } from "next/headers";

export default async function MessageDeleteAction({
  url,
  isMember,
  tags,
  password,
}: {
  url: string;
  isMember: boolean;
  tags: string[];
  password: string;
}) {
  const cookieStore = cookies();
  const authCookie = cookieStore.get("token");

  return await revaildateTags(async () => {
    return await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        ...(isMember &&
          authCookie && {
            Authorization: `Bearer ${authCookie.value}`,
          }),
      },
      body: JSON.stringify({ password }),
    });
  }, tags);
}
