import MyContents from "@/app/(protected-page)/mypage/_components/MyContents";
import Myprofile from "@/app/(protected-page)/mypage/_components/Myprofile";
import { QUERY_KEY } from "@/types/constans";
import { withFetchRevaildationAction } from "@/utils/with-fetch-revaildation";

import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

const queryClient = new QueryClient();

export default async function page() {
  await queryClient.prefetchQuery({
    queryKey: [QUERY_KEY.MY_CONTENTS],
    queryFn: async () => {
      const { result } = await withFetchRevaildationAction({
        endPoint: "user/me/contents",
        requireAuth: true,
        options: {
          cache: "no-store",
        },
      });

      return result;
    },
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
