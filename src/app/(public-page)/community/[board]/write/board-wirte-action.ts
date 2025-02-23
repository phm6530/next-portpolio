"use server";
import { withFetchRevaildation } from "@/action/with-fetch-revaildation";
import { BASE_NEST_URL } from "@/config/base";
import { CategoriesKey } from "@/types/board";
import { cookies } from "next/headers";

export async function BoardWirteAction({
  boardKey,
  body,
  isMember,
}: {
  boardKey: CategoriesKey;
  body: { [key: string]: any };
  isMember: boolean;
}) {
  const cookieStore = cookies();
  const authCookie = cookieStore.get("token");

  return await withFetchRevaildation(async () => {
    return await fetch(`${BASE_NEST_URL}/board/${boardKey}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",

        ...(isMember &&
          authCookie && {
            Authorization: `Bearer ${authCookie.value}`,
          }),
      },

      body: JSON.stringify(body),
    });
  }, [`community-${boardKey}`]);
}
