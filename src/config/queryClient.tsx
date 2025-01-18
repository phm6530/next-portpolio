import { QueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
    mutations: {
      onError: (error: any) => {
        if (error.message === "UNAUTHORIZED") {
          toast.error(error.message);

          // 권한이 없을 시 Client reload해서 유저데이터 초기화
          window.location.reload();
        } else {
          // 기타 에러 처리
          toast.error(error.message);
        }
      },
    },
  },
});
