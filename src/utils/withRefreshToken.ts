import { BASE_NEST_URL } from "@/config/base";
import { SessionStorage } from "@/utils/SessionStorage-token";
type RefreshAccessToken = {
  message: string;
  refreshAccessToken: string;
};

async function fetchWithAuth(url: string, options: RequestInit = {}) {
  //요청
  const response = await fetch(url, options);

  //옵션세팅
  options = {
    ...options,
    cache: "no-store",
  };

  if (!response.ok) {
    if (response.status === 401) {
      console.log("리프래시 ");
      try {
        const response = await fetch(`${BASE_NEST_URL}/auth/accesstoken`, {
          cache: "no-store",
          //리프래시 전달
          credentials: "include",
        });
        const result: RefreshAccessToken = await response.json();
        SessionStorage.setAccessToken(result.refreshAccessToken);
        options = {
          ...options,
          headers: {
            authorization: `Bearer ${result.refreshAccessToken}`,
          },
        };
        const reRequestReponse = await fetch(url, options);
        return await reRequestReponse.json();
      } catch (error) {
        //로그아웃 시키기
        console.log(error);
      }
    }
  }

  return await response.json();
}

export default fetchWithAuth;
