import { queryClient } from "@/config/queryClient";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { ComponentType } from "react";

//다이나믹 랜더 컴포넌트 생성
export const WithDynamicRender = async (
  Component: ComponentType,
  cb: () => Promise<void>
) => {
  // 고차 컴포넌트 반환
  return async function DynamicComponent(props: any) {
    // 콜백 실행하여 데이터를 미리 패칭
    await cb();

    return (
      <>
        <HydrationBoundary state={dehydrate(queryClient)}>
          <Component {...props} />
        </HydrationBoundary>
      </>
    );
  };
};
