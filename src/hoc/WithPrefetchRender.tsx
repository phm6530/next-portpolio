import { queryClient } from "@/config/queryClient";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { ComponentType } from "react";

export const WithPrefetchRender = async <T extends object>(
  Component: ComponentType<T>,
  cb: () => Promise<void>
) => {
  // 고차 컴포넌트 반환
  return async function Render(props: T) {
    // 콜백 실행하여 데이터를 미리 패칭
    await cb();

    return (
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Component {...props} />
      </HydrationBoundary>
    );
  };
};
