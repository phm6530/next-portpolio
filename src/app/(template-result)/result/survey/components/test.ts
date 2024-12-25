import { BASE_NEST_URL } from "@/config/base";
import requestHandler from "@/utils/withFetch";
import { COMMENT_NEED_PATH } from "../[id]/page";

//Survey Result Data
export async function fetchSurveyData<T>(id: string): Promise<T> {
  return requestHandler(async () => {
    return await fetch(`${BASE_NEST_URL}/answer/survey/${id}`, {
      cache: "no-store",
    });
  });
}

export async function fetchComments<T>(
  id: number,
  type: COMMENT_NEED_PATH
): Promise<T> {
  const url = `${BASE_NEST_URL}/comment/${type}/${id}`;
  console.log(url);
  return requestHandler(async () => {
    return await fetch(url, {
      cache: "no-store",
    });
  });
}
// export async function fetchComments<T>(id: string, type: string): Promise<T> {
//   try {
//     const response = await fetch(`${BASE_NEST_URL}/comment/${type}/${id}`, {
//       cache: "no-store",
//     });
//     return response.json();
//   } catch (error) {
//     throw new Error("에러..");
//   }
// }
