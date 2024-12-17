import { BASE_NEST_URL } from "@/config/base";
import { SessionStorage } from "./sessionStorage-token";

export type RefreshAccessToken = {
  message: string;
  refreshAccessToken: string;
};

//Access Token 생성
async function fetchAccessToken(
  refreshToken?: string
): Promise<RefreshAccessToken> {
  let option: RequestInit = {
    cache: "no-store",
  };

  if (typeof window === "undefined") {
    console.log("서버");
    //server
    option = {
      ...option,
      headers: {
        Cookie: `refreshToken=${refreshToken}`,
      },
    };
  } else {
    //Client
    console.log("클라");
    option = {
      ...option,
      credentials: "include",
    };
  }

  const newAccessToken = await fetch(
    `${BASE_NEST_URL}/auth/accesstoken`,
    option
  );

  if (!newAccessToken.ok) {
    throw new Error("AccessToken 재 발급 실패");
  }

  return await newAccessToken.json();
}

async function fetchWithAuth(url: string, options: RequestInit = {}) {
  try {
    //요청
    //옵션세팅
    options = {
      ...options,
      cache: "no-store",
    };

    //요청
    const response = await fetch(url, options);

    if (!response.ok) {
      //권한 없으면 토큰 재 생성
      if (response.status === 401) {
        //토큰 재발급
        const getToken = await fetchAccessToken();

        //토큰 세션 저장
        if (typeof window !== "undefined") {
          SessionStorage.setAccessToken(getToken.refreshAccessToken);
        }

        options = {
          ...options,
          headers: {
            ...options.headers,
            authorization: `Bearer ${getToken.refreshAccessToken}`,
          },
        };

        const reRequestReponse = await fetch(url, options);

        if (!reRequestReponse.ok) {
          const response = await reRequestReponse.json();
          throw new Error(response.message);
        }
        return await reRequestReponse.json();
      } else {
        const errorMsg = await response.json();
        throw new Error(errorMsg.message);
      }
    }

    return await response.json();
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("요청 처리 중 에러가 발생했습니다.");
  }
}

export { fetchWithAuth, fetchAccessToken };
