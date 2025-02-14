"use client";

import { CategoriesKey } from "@/types/board";
import { User, USER_ROLE } from "@/types/auth.type";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { withFetch } from "@/util/clientUtil";
import { BASE_NEST_URL } from "@/config/base";
import { useRouter } from "next/navigation";
import { QUERY_KEY } from "@/types/constans";
import usePopup from "@/app/hook/usePopup";
import DeleteItemForm from "@/components/DeleteItemForm";
import revaildateTags from "@/lib/revaildateTags";
import { Button } from "@/components/ui/button";
import Link from "next/link";

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
  const { isOpen, openModal, closeModal, PopupComponent } = usePopup();

  const userData: User | null =
    queryClient.getQueryData([QUERY_KEY.USER_DATA]) ?? null;

  // 권한 있는 Post
  const authrozationPost =
    creatorRole === USER_ROLE.ADMIN || creatorRole === USER_ROLE.USER;

  const { mutate, isPending } = useMutation({
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

      try {
        // 삭제 이후
        await withFetch(async () => {
          return await fetch(
            `${BASE_NEST_URL}/board/${category}/${id}`,
            options
          );
        });

        // revaildate
        await revaildateTags({
          tags: [`post-${category}-${id}`, `comunity-${category}`],
        });
      } catch (error) {
        throw error;
      }
    },
    onSuccess: () => {
      alert("삭제되었습니다.");
      router.replace(`/community/${category}`);
      router.refresh();
    },
  });

  const postDeleteHandler = async () => {
    let body: { password: string } | undefined;

    // Test 추후 Modal 로 처리 예정
    if (!authrozationPost) {
      openModal();
    }

    if (authrozationPost) {
      if (!confirm(`삭제하시겠습니까?\n삭제 시 복구 불가합니다.`)) {
        return;
      }
      mutate(authrozationPost ? undefined : body);
    }
  };

  const deleteFunc = (password: string) => mutate({ password });
  return (
    <>
      <PopupComponent isOpen={isOpen} closeModal={closeModal}>
        <DeleteItemForm action={deleteFunc} isPending={isPending} />
      </PopupComponent>
      <div className="flex items-center gap-2 text-sm">
        {/* Edit  */}
        <Button variant={"outline"} asChild>
          <Link href={`/community/${category}`}>목록</Link>
        </Button>

        {(!authrozationPost ||
          (creatorEmail === userData?.email &&
            (creatorRole === USER_ROLE.ADMIN ||
              creatorRole === USER_ROLE.USER))) && (
          <>
            <Button variant={"outline"} onClick={postDeleteHandler}>
              삭제
            </Button>
          </>
        )}
        {/* Edit  */}
        {/* Delete */}
      </div>
    </>
  );
}
