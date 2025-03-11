import { MutationCache, QueryCache, QueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

/**
 * @description 전역 에러 처리를 위한 QueryClient 설정
 *
 * v5에서는 전역 에러 처리를 위해 QueryCache와 MutationCache 인스턴스를
 * 별도 생서해야함
 *
 * - QueryCache: 쿼리 요청에서 발생하는 에러 처리 담당
 * - MutationCache: 데이터 변경 작업에서 발생하는 에러 처리 담당
 * v4에서는 query Erorr는 상태변경의 상이해질 수 있는 문제가 있어서 제외 시켰다고 공식문서에서 봤음
 */

const errorHandler = (error: Error) => {
  toast.error(error.message);
};

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
  queryCache: new QueryCache({
    onError: errorHandler,
  }),
  mutationCache: new MutationCache({
    onError: errorHandler,
  }),
});
