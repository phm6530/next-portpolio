"use client";
import { ERROR_CODE } from "@/codeMsg";
import { BASE_NEST_URL } from "@/config/base";
import { QUERY_KEY } from "@/types/constans";

//권한 확인 고차함수
import { SessionStorage } from "@/utils/sessionStorage-token";
import { fetchWithAuth } from "@/utils/withRefreshToken";
import { useQuery } from "@tanstack/react-query";
import { usePathname, useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";

export default function WithProtectedComponent({
  children,
}: {
  children: ReactNode;
}) {
  const sessionToken = SessionStorage.getAccessToken();

  const router = useRouter();
  const pathname = usePathname();

  const { isError, isSuccess } = useQuery({
    queryKey: [QUERY_KEY.USER_DATA],
    queryFn: async () => {
      const endpoint = `${BASE_NEST_URL}/user/me`;
      const option: RequestInit = {
        cache: "no-store",
        headers: {
          authorization: `Bearer ${sessionToken}`,
        },
      };
      const test = await fetchWithAuth(endpoint, option);

      return test;
    },
  });

  //로그아웃 시켜버리기
  useEffect(() => {
    if (!sessionToken || isError) {
      //세션삭제
      SessionStorage.removeAccessToken();
      router.refresh();

      router.replace(
        `/auth/login?redirect=${pathname}&code=${ERROR_CODE.UNAUTHORIZED}`
      );
    }
  }, [sessionToken, pathname, router, isError]);

  //토큰유효에 성공 했을시에 컴포넌트 반환하기
  if (isSuccess) {
    return <>{children}</>;
  } else {
    return null;
  }
}
