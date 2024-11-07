"use client";
import { BASE_NEST_URL } from "@/config/base";
import { User } from "@/types/auth.type";
import { QUERY_KEY } from "@/types/constans";
import { TemplateItemMetadata } from "@/types/template.type";
import { SessionStorage } from "@/utils/sessionStorage-token";
import fetchWithAuth from "@/utils/withRefreshToken";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export default function MyContents() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const userdata = queryClient.getQueryData<User>([QUERY_KEY.USER_DATA]);
  const { data, isLoading } = useQuery<TemplateItemMetadata[]>({
    queryKey: [QUERY_KEY.MY_CONTENTS],
    queryFn: async () => {
      const token = SessionStorage.getAccessToken();
      const url = `${BASE_NEST_URL}/user/me/contents`;
      const options: RequestInit = {
        headers: {
          authorization: `Bearer ${token}`,
        },
      };
      return await fetchWithAuth(url, options);
    },
    enabled: !!userdata,
    staleTime: Infinity,
  });

  return (
    <>
      <h2>생성한 템플릿</h2>
      {isLoading ? (
        <>loading..</>
      ) : (
        <div>
          {data?.map((e, idx) => {
            console.log(e);
            return (
              <div key={idx}>
                {e.title}
                <div>
                  <button>결과페이지</button>
                  <button
                    onClick={() =>
                      router.push(`/made/${e.templateType}?edit=${e.id}`)
                    }
                  >
                    수정
                  </button>
                  <button>삭제</button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}
