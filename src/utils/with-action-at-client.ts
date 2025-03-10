"use client";

import { QUERY_KEY } from "@/types/constans";
import { withFetchRevaildationAction } from "./with-fetch-revaildation";
import { queryClient } from "@/config/queryClient";
import { ERROR_CODE } from "@/config/codeMsg";

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
      // 전역 client 인스턴스
      queryClient.removeQueries({ queryKey: [QUERY_KEY.USER_DATA] });
      const redirectPath = `/auth/login?code=${ERROR_CODE.UNAUTHORIZED}`;
      window.location.href = redirectPath;
      throw new Error("다시 로그인해주세요");
    }
    throw new Error(message);
  }

  return result;
}
