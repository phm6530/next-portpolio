"use server";
import { revaildateTags } from "@/action/revaildate";
import { BASE_NEST_URL } from "@/config/base";
import { CategoriesKey } from "@/types/board";
import { cookies } from "next/headers";

export async function BoardDeleteAction({
  category,
  id,
  body,
  isMember,
}: {
  category: CategoriesKey;
  id: number;
  body: { password?: string };
  isMember: boolean;
}) {
  const cookieStore = cookies();
  const authCookie = cookieStore.get("token");

  return await revaildateTags(async () => {
    return await fetch(`${BASE_NEST_URL}/board/${category}/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        ...(isMember &&
          authCookie && {
            Authorization: `Bearer ${authCookie.value}`,
          }),
      },

      body: JSON.stringify(body),
    });
  }, [`post-${category}-${id}`, `community-${category}`]);
}
