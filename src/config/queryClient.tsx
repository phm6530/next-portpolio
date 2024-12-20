import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
    mutations: {
      onError: (error: any) => {
        if (error.message === "UNAUTHORIZED") {
          alert(`${error.message} : 권한이 없습니다.`);

          // 권한이 없을 시 Client reload해서 유저데이터 초기화
          window.location.reload();
        } else {
          // 기타 에러 처리
          alert(error.message);
        }
      },
    },
  },
});
