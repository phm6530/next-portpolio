import { BASE_NEST_URL } from "@/config/base";
import { MSG_PARAM_PATH } from "@/types/comment.type";
import { withFetch } from "@/util/clientUtil";
import requestHandler from "@/utils/withFetch";

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
  type: MSG_PARAM_PATH
): Promise<T> {
  const url = `${BASE_NEST_URL}/comment/${type}/${id}`;
  return withFetch(async () => {
    return await fetch(url, {
      cache: "force-cache",
      next: { tags: [`comment-${type}-${id}`] },
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
