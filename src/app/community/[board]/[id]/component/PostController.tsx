"use client";

import { CategoriesKey } from "@/types/board";
import classes from "./PostController.module.scss";
import { User, USER_ROLE } from "@/types/auth.type";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { withFetch } from "@/util/clientUtil";
import { BASE_NEST_URL } from "@/config/base";
import { useRouter } from "next/navigation";
import { QUERY_KEY } from "@/types/constans";

export default function PostController({
  id,
  category,
  creatorRole,
  creatorEmail,
}: {
  id: string;
  category: CategoriesKey;
  creatorRole: USER_ROLE; // 해당 Post를 생성한 사람의 Role
  creatorEmail: string | null;
}) {
  const router = useRouter();

  const queryClient = useQueryClient();

  const userData: User | null =
    queryClient.getQueryData([QUERY_KEY.USER_DATA]) ?? null;

  // 권한 있는 Post
  const authrozationPost =
    creatorRole === USER_ROLE.ADMIN || creatorRole === USER_ROLE.USER;

  const { mutateAsync } = useMutation({
    mutationFn: async (data?: { password: string }) => {
      let options: RequestInit = {
        method: "DELETE",

        ...(authrozationPost
          ? { credentials: "include" }
          : {
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(data),
            }),
      };

      return await withFetch(async () => {
        return await fetch(`${BASE_NEST_URL}/board/${category}/${id}`, options);
      });
    },
    onSuccess: () => {
      alert("삭제되었습니다.");
      router.replace(`/community/${category}`);
    },
  });

  const postDeleteHandler = async () => {
    let body: { password: string } | undefined;

    // Test 추후 Modal 로 처리 예정
    if (!authrozationPost) {
      const msgPassword = prompt("비밀번호를 입력해주세요");
      if (msgPassword !== null && msgPassword.trim() !== "") {
        body = { password: msgPassword.trim() };
      } else {
        alert("비밀번호를 입력해야 합니다.  ");
        return;
      }
    }

    if (authrozationPost) {
      if (!confirm(`삭제하시겠습니까?\n삭제 시 복구 불가합니다.`)) {
        return;
      }
    }
    await mutateAsync(authrozationPost ? undefined : body);
  };

  return (
    <div className={classes.controller}>
      {/* Edit  */}
      <button onClick={() => router.push(`/community/${category}`)}>
        목록
      </button>

      {(!authrozationPost ||
        (creatorEmail === userData?.email &&
          (creatorRole === USER_ROLE.ADMIN ||
            creatorRole === USER_ROLE.USER))) && (
        <>
          <button onClick={() => router.push("/")}>수정</button>
          <button onClick={postDeleteHandler}>삭제</button>
        </>
      )}

      {/* Edit  */}

      {/* Delete */}
    </div>
  );
}
