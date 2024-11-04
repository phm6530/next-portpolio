import { BASE_NEST_URL } from "@/config/base";
import { SessionStorage } from "@/utils/sessionStorage-token";

type RefreshAccessToken = {
  message: string;
  refreshAccessToken: string;
};

async function fetchWithAuth(url: string, options: RequestInit = {}) {
  //요청
  //옵션세팅
  options = {
    ...options,
    cache: "no-store",
  };

  const response = await fetch(url, options);

  if (!response.ok) {
    if (response.status === 401) {
      const newAccessToken = await fetch(`${BASE_NEST_URL}/auth/accesstoken`, {
        cache: "no-store",
        credentials: "include",
      });

      if (!newAccessToken.ok) {
        throw new Error("AccessToken 재 발급 실패");
      }
      const result: RefreshAccessToken = await newAccessToken.json();

      //액세스토큰 다시
      SessionStorage.setAccessToken(result.refreshAccessToken);

      options = {
        ...options,
        headers: {
          ...options.headers,
          authorization: `Bearer ${result.refreshAccessToken}`,
        },
      };

      console.log("options::::", options);
      const reRequestReponse = await fetch(url, options);

      if (!reRequestReponse.ok) {
        const response = await reRequestReponse.json();
        throw response;
      }
      return await reRequestReponse.json();
    } else {
      const errorMsg = await response.json();
      throw new Error(errorMsg.message);
    }
  }

  return await response.json();
}

export default fetchWithAuth;
