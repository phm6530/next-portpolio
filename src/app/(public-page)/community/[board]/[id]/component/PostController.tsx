"use client";

import { CategoriesKey } from "@/types/board";
import { User, USER_ROLE } from "@/types/auth.type";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { QUERY_KEY, REQUEST_METHOD } from "@/types/constans";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { toast } from "react-toastify";
import ConfirmDialog from "@/components/ui/confirm-button";
import { PsConfirmModal } from "@/components/shared/modals/password-input-modal";
import { withFetchRevaildationAction } from "@/action/with-fetch-revaildation";

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
  const queryClient = useQueryClient();
  const router = useRouter();

  const userData: User | null =
    queryClient.getQueryData([QUERY_KEY.USER_DATA]) ?? null;

  // 권한 있는 Post
  const authrozationPost =
    creatorRole === USER_ROLE.ADMIN || creatorRole === USER_ROLE.USER;

  const { mutateAsync, isPending } = useMutation<
    void,
    Error,
    { password?: string }
  >({
    mutationFn: async (data) => {
      const result = await withFetchRevaildationAction({
        endPoint: `board/${category}/${id}`,
        requireAuth: !!userData,
        options: {
          method: REQUEST_METHOD.DELETE,
          ...(!!userData
            ? {}
            : { body: JSON.stringify({ password: data.password }) }),
        },
        tags: [`post-${category}-${id}`, `community-${category}`],
      });

      if (!result.success) {
        throw new Error(result.message);
      }
    },

    onSuccess: () => {
      toast.success("삭제되었습니다.");
      queryClient.refetchQueries({
        queryKey: ["board"],
      });

      router.replace(`/community/${category}`);
      router.refresh();
    },
  });

  return (
    <>
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
            {authrozationPost ? (
              <ConfirmDialog
                title="해당 글을 삭제하시겠습니까?"
                description={"삭제 한 게시물은 복구가 불가합니다."}
                cb={async () => await mutateAsync({})}
              >
                <Button variant={"outline"}>삭제</Button>
              </ConfirmDialog>
            ) : (
              <PsConfirmModal
                disalbed={isPending}
                cb={async (formData) => await mutateAsync(formData)}
              >
                <Button variant="outline" disabled={isPending}>
                  삭제
                </Button>
              </PsConfirmModal>
            )}
          </>
        )}

        {/* Edit  */}
        {/* Delete */}
      </div>
    </>
  );
}
