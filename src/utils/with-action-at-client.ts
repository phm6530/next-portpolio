"use client";

import { QUERY_KEY } from "@/types/constans";
import { withFetchRevaildationAction } from "./with-fetch-revaildation";
import { queryClient } from "@/config/queryClient";

/**
 * @param actionPromise 서버 액션 Promise
 * 인퍼로 추론했으니까 타입안해도 상관없음
 * 추후에 hook으로 바꾸자
 */

type InferReturnType<T> = T extends (..._arg: any) => infer R ? R : never;

export default async function withActionAtClient<T>(
  serverAction: () => InferReturnType<typeof withFetchRevaildationAction<T>>
) {
  const { success, result, message, statusCode } = await serverAction();

  if (!success) {
    if (statusCode === 401) {
      // 권한에러 처리나면 캐시 비워버리기
      /**
       * @comment 현재 401에러는 만료 이외엔 없기에 쿼리 비워버리기
       */
      queryClient.removeQueries({ queryKey: [QUERY_KEY.USER_DATA] });
    }
    throw new Error(message);
  }

  return result;
}
