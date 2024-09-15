"use client";

import { queryClient } from "@/config/queryClient";
import { withFetch } from "@/util/clientUtil";
import { QUERY_KEY } from "@/types/constans";
import { TemplateTypeProps } from "@/types/template";
import { useMutation } from "@tanstack/react-query";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { BASE_URL } from "@/config/base";

export default function AdminController({
  user,
  curTemplateType,
  curTemplateKey,
  curTemplateId,
  startDate,
  endDate,
}: {
  user:
    | {
        access_email: string;
        template_key: string;
        role: "anonymous";
      }
    | {
        user_id: string;
        user_name: string;
        user_nickname: string;
        role: "admin";
      };
  curTemplateType: TemplateTypeProps;
  curTemplateKey: string;
  curTemplateId?: number;
  startDate?: string;
  endDate?: string;
}) {
  const isTemplateAuth =
    (user.role === "anonymous" && curTemplateKey === user.template_key) ||
    user.role === "admin";

  const { data: session } = useSession();

  useEffect(() => {
    //익명 관리자는 해당 페이지 나가면 세션 OFF 해버리기
    return () => {
      if (session?.user.role === "anonymous") {
        signOut();
      }
    };
  }, [session?.user.role]);

  const anonyMouseUser = user.role === "anonymous";
  const admin = user.role === "admin";

  const router = useRouter();

  const { mutate } = useMutation({
    mutationFn: () =>
      withFetch(async () => {
        const url = `${BASE_URL}/api/template/${curTemplateKey}`;
        return fetch(url, {
          method: "DELETE",
        });
      }),
    onSuccess: () => {
      alert("삭제 성공!");
      router.replace("/template");
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.TEMPLATE_LIST] });
    },
  });

  const deleteTemplate = () => {
    if (!isTemplateAuth) return;

    if (confirm("삭제하시겠습니까?")) {
      mutate();
    }
  };

  return (
    <>
      <h1>안녕하세요</h1>
      {anonyMouseUser && `${user.access_email} 님`}
      {admin && `${user.user_id} M 님`}

      {anonyMouseUser && (
        <>
          <p>익명 관리자는 페이지를 이탈하면 재 접속해야합니다!</p>
        </>
      )}

      <button onClick={deleteTemplate}>삭제</button>
      <button
        onClick={() =>
          router.push(
            `/template/made/${curTemplateType}?edit=${curTemplateKey}`
          )
        }
      >
        수정
      </button>
      {curTemplateId && (
        <button
          onClick={() => router.push(`/template/result/${curTemplateId}`)}
        >
          결과페이지 가기
        </button>
      )}
    </>
  );
}
