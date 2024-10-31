"use client";
import { BASE_NEST_URL } from "@/config/base";
import useStore from "@/store/store";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

export default function AuthenticationStore({ token }: { token: boolean }) {
  const store = useStore();

  // React Query를 사용해 사용자 인증 정보를 가져옴
  const {
    data: userData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["ClientAuth"],
    queryFn: async () => {
      const response = await fetch(`${BASE_NEST_URL}/user/me`, {
        credentials: "include",
      });

      // HTTP 상태 코드 확인 후 오류가 있을 경우 예외 던짐
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      return await response.json();
    },
    enabled: token, // 토큰이 있을 때만 쿼리 실행 ddd
  });

  useEffect(() => {
    if (!isLoading && userData && !isError) {
      // 현재 상태와 다를 경우에만 업데이트
      if (
        store.authUser.nickname !== userData.nickname ||
        store.authUser.email !== userData.email ||
        store.authUser.role !== userData.role
      ) {
        store.setAuthUser(userData);
      }
    } else if (isError) {
      // 에러가 발생했을 경우 사용자 정보를 초기화
      store.setRemoveUser();
    }
  }, [userData, isLoading, isError, store]);

  return null; // 렌더링 없이 상태 처리만 수행
}
