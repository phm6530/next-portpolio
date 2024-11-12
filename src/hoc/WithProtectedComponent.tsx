"use client";
import { ERROR_CODE } from "@/codeMsg";
import { BASE_NEST_URL } from "@/config/base";
import { QUERY_KEY } from "@/types/constans";
//권한 확인 고차함수

import { SessionStorage } from "@/utils/sessionStorage-token";
import fetchWithAuth from "@/utils/withRefreshToken";
import { useQuery } from "@tanstack/react-query";
import { usePathname, useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";

export default function WithProtectedComponent({
  children,
}: {
  children: ReactNode;
}) {
  const [token, setToken] = useState<string | null>(
    SessionStorage.getAccessToken() || null
  );
  const sessionToken = SessionStorage.getAccessToken();

  useEffect(() => {
    setToken(sessionToken);
  }, [sessionToken]);

  const router = useRouter();
  const pathname = usePathname();

  const { isSuccess, isLoading, isError } = useQuery({
    queryKey: [QUERY_KEY.USER_DATA],
    queryFn: async () => {
      const endpoint = `${BASE_NEST_URL}/user/me`;
      const option: RequestInit = {
        cache: "no-store",
        headers: {
          authorization: `Bearer ${token}`,
        },
      };
      return await fetchWithAuth(endpoint, option);
    },
    enabled: !!token, //토큰이 있을때만 검사
  });

  //로그아웃 시켜버리기
  useEffect(() => {
    if (!token || isError) {
      //세션삭제
      SessionStorage.removeAccessToken();
      router.replace(
        `/auth/login?redirect=${pathname}&code=${ERROR_CODE.AUTH_001}`
      );
    }
  }, [token, pathname, router, isError]);

  if (isLoading) {
    return <>loading.......</>;
  }

  if (token) {
    return <>{children}</>;
  } else {
    return null;
  }
}
