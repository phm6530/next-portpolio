import MyContents from "@/app/(protected-page)/mypage/_components/MyContents";
import Myprofile from "@/app/(protected-page)/mypage/_components/Myprofile";
import { QUERY_KEY } from "@/types/constans";
import withAuthFetch from "@/utils/withAuthFetch";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { cookies } from "next/headers";

const queryClient = new QueryClient();

export default async function page() {
  const cookieStore = cookies();
  const token = cookieStore.get("token")?.value;

  await queryClient.prefetchQuery({
    queryKey: [QUERY_KEY.MY_CONTENTS],
    queryFn: async () => {
      const url = `user/me/contents`;
      const options: RequestInit = {
        cache: "no-store",
        headers: {
          authorization: `Bearer ${token}`,
        },
      };
      return await withAuthFetch(url, options);
    },
    staleTime: 10000,
  });

  return (
    <div className="flex flex-col gap-8 py-12">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Myprofile />
        <MyContents />
      </HydrationBoundary>
    </div>
  );
}
