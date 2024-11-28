"use client";
import { BASE_NEST_URL } from "@/config/base";
import { User } from "@/types/auth.type";
import { QUERY_KEY } from "@/types/constans";
import classes from "./MyContents.module.scss";
import {
  RespondentsAndMaxGroup,
  TemplateItemMetadata,
} from "@/types/template.type";
import { SessionStorage } from "@/utils/sessionStorage-token";
import fetchWithAuth from "@/utils/withRefreshToken";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function MyContents() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const userdata = queryClient.getQueryData<User>([QUERY_KEY.USER_DATA]);

  const { data, isLoading } = useQuery<{
    data: TemplateItemMetadata<RespondentsAndMaxGroup>[];
    nextPage: null | number;
  }>({
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

  const { mutate } = useMutation<
    unknown,
    Error,
    Pick<TemplateItemMetadata<RespondentsAndMaxGroup>, "id" | "templateType">
  >({
    mutationFn: async ({ templateType, id }) => {
      const url = `${BASE_NEST_URL}/template/${templateType}/${id}`;
      const token = SessionStorage.getAccessToken();
      const options: RequestInit = {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      };
      const response = await fetchWithAuth(url, options);
      console.log(response);
      return response;
    },
    onSuccess: () => {
      alert("삭제되었습니다.");
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.MY_CONTENTS],
      });
    },
    onError: (error) => {
      console.error(error);
      alert(`삭제 중 오류 발생: ${error.message}`);
    },
  });

  const templateDeleteHanlder = ({
    templateType,
    id,
  }: Pick<
    TemplateItemMetadata<RespondentsAndMaxGroup>,
    "id" | "templateType"
  >) => {
    confirm("삭제 하시겠습니까? \n삭제 시 영구 삭제되어 복구할 수 없습니다.") &&
      mutate({ templateType, id });
  };

  return (
    <div>
      <h3>내가만든 템플릿</h3>

      <button onClick={() => router.push("/made")}>만들기</button>

      {isLoading ? (
        <>loading..</>
      ) : (
        <div className={classes.container}>
          {data?.data.map((e, idx) => {
            return (
              <div key={idx} className={classes.myTemplateItem}>
                {e.thumbnail && (
                  <div className={classes.imgWrap}>
                    <Image
                      src={e.thumbnail}
                      alt={e.title}
                      fill
                      sizes="(max-width: 768px) 50vw, (max-width: 1200px) 50vw, 33vw"
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                )}
                <div>
                  <div>
                    <p>{e.title}</p>
                    <p>{e.description}</p>
                  </div>
                  <div>
                    <button
                      onClick={() =>
                        router.push(`/result/${e.templateType}/${e.id}`)
                      }
                    >
                      결과페이지
                    </button>

                    <button
                      onClick={() =>
                        router.push(`/made/${e.templateType}?edit=${e.id}`)
                      }
                    >
                      수정
                    </button>

                    <button
                      onClick={() =>
                        templateDeleteHanlder({
                          templateType: e.templateType,
                          id: e.id,
                        })
                      }
                    >
                      삭제
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
