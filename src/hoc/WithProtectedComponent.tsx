"use client";
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
  const [isClient, setIsClient] = useState(false);
  const token = isClient ? SessionStorage.getAccessToken() : null;
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    setIsClient(true); // 클라이언트에서만 실행되도록 설정
  }, []);

  const { isSuccess } = useQuery({
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

  useEffect(() => {
    if (isClient && !token) {
      router.push(`/auth/login?redirect=${pathname}&code=AUTH_001`);
    }
  }, [isClient, token, router, pathname]);

  if (token) {
    return <>{children}</>;
  } else {
    return null;
  }
}
