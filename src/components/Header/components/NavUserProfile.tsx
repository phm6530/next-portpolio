"use client";

import classes from "./NavUserProfile.module.scss";
import { useQuery } from "@tanstack/react-query";
import { BASE_NEST_URL } from "@/config/base";
import fetchWithAuth from "@/utils/withRefreshToken";
import { User } from "@/types/auth.type";
import { SessionStorage } from "@/utils/SessionStorage-token";
import { useState, useEffect } from "react";

export default function NavUserProfile() {
  // 초기 토큰 상태 설정
  const [token, setToken] = useState<string | null>(null);

  // 클라이언트에서 토큰을 가져오는 부분을 useEffect로 처리
  useEffect(() => {
    const accessToken = SessionStorage.getAccessToken();
    setToken(accessToken);
  }, []);

  const { data, isLoading, isSuccess } = useQuery<User>({
    queryKey: ["auth"],
    queryFn: async () => {
      const endpoint = `${BASE_NEST_URL}/user/me`;
      const option: RequestInit = {
        cache: "no-store",
        headers: {
          authorization: `Bearer ${token}`,
        },
        credentials: "include",
      };

      return await fetchWithAuth(endpoint, option);
    },
    enabled: !!token, // 토큰이 있을 때만 쿼리 실행
    staleTime: 10000,
  });

  return (
    <div className={classes.Wrapper}>
      {!isSuccess && <>loading...</>}

      <div className={classes.nickName}>{data?.nickname}</div>
    </div>
  );
}
