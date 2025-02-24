import { Button } from "@/components/ui/button";
import Link from "next/link";

import requestHandler from "@/utils/withFetch";
import { BASE_NEST_URL } from "@/config/base";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useQueryReset } from "@/utils/queryClientReset";
import { toast } from "react-toastify";
import { usePathname, useRouter } from "next/navigation";
import { QUERY_KEY } from "@/types/constans";
import { User } from "@/types/auth.type";
import UserRoleDisplay from "@/components/ui/userRoleDisplay/UserRoleDisplay";
import { cn } from "@/lib/utils";

export default function HeaderAuthController({
  className,
}: {
  className?: string;
}) {
  const { resetUserQueries } = useQueryReset();
  const router = useRouter();
  const queryClient = useQueryClient();
  const pathname = usePathname();
  const userData = queryClient.getQueryData([QUERY_KEY.USER_DATA]) as User;

  /** 로그아웃 */
  const { mutate: logout } = useMutation({
    mutationFn: async () => {
      return requestHandler(async () => {
        return await fetch(`${BASE_NEST_URL}/auth/logout`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include", // HttpOnly 리프래시  토큰 삭제를 위해 설정했음
        });
      });
    },
    onSuccess: async () => {
      resetUserQueries();
      toast.success("로그아웃 되었습니다.");
      router.refresh(); // refresh 해버리기
    },
    onError: () => {
      router.refresh(); // refresh 해버리기
    },
  });

  return (
    <div className={cn("items-center justify-end", className)}>
      {!!userData ? (
        <div className="flex">
          <Button
            variant={"ghost"}
            size={"sm"}
            asChild
            className="text-[12px] rounded-r-none pr-4 mr-4 border-r "
          >
            <Link href={"/mypage"}>마이페이지</Link>
          </Button>
          <UserRoleDisplay role={userData.role} nickname={userData?.nickname} />
          <Button
            variant={"outline"}
            size={"sm"}
            className="text-[12px] ml-4"
            onClick={() => logout()}
          >
            로그아웃
          </Button>
        </div>
      ) : (
        <Link href={`/auth/login?redirect=${pathname}`}>로그인</Link>
      )}
    </div>
  );
}
