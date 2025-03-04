"use server";
import { withFetchRevaildation } from "@/action/with-fetch-revaildation";
import { BASE_NEST_URL } from "@/config/base";
import { cookies } from "next/headers";

export async function SurveyCreateAction({
  editId,
  body,
}: {
  editId: string | null;
  body: { [key: string]: any };
}) {
  const cookieStore = cookies();
  const authCookie = cookieStore.get("token");

  return await withFetchRevaildation(async () => {
    return await fetch(
      `${BASE_NEST_URL}/template/survey${!!editId ? `/${editId}` : ""}}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authCookie?.value}`,
        },

        body: JSON.stringify(body),
      }
    );
  }, [`template-survey-${editId}`]);
}
