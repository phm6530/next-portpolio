import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { ComponentType } from "react";

export const WithPrefetchRender = async <T extends object>(
  Component: ComponentType<T>,
  prefetchCallback: (queryClient: QueryClient) => Promise<void> // queryClient를 전달받아 패칭하도록 설정
) => {
  const queryClient = new QueryClient();

  // 미리 패칭 실행
  await prefetchCallback(queryClient);

  // 컴포넌트 반환
  return function Render(props: T) {
    return (
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Component {...props} />
      </HydrationBoundary>
    );
  };
};
