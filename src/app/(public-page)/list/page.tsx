import Grid from "@/components/ui/Grid";
import classes from "./page.module.scss";

import ListFilterControls from "./components/ListFilterControls";
import ListPageBanner from "@/app/list/components/ListPageBanner";
// import TemplateList from "@/app/list/components/TemplateItemList";

import { default as loadDynamic } from "next/dynamic";
import LoadingSummrySkeleton from "@/components/loading/LoadingSummrySkeleton";
import SearchInput from "@/components/ui/SearchInput";

// TemplateList를 동적 로드로 설정 (SSR 비활성화)
const TemplateList = loadDynamic(
  () => import("@/app/list/components/TemplateItemList"),
  {
    ssr: false,
    loading: () => <LoadingSummrySkeleton cnt={8} />,
  }
);

export default async function page() {
  // 고차 컴포넌트
  // const PrefetchTemplateList = await WithPrefetchRender(
  //   TemplateList,
  //   async (queryClient) => {
  //     await queryClient.prefetchInfiniteQuery({
  //       queryKey: [QUERY_KEY.TEMPLATE_LIST, sort],
  //       queryFn: async ({ pageParam = 1 }) => {
  //         let url = `${BASE_NEST_URL}/template?sort=${sort}`;
  //         url += `&page=${pageParam}`;

  //         const response = await fetch(url, {
  //           cache: "no-cache",
  //         });

  //         return await response.json();
  //       },
  //       getNextPageParam: (lastPage: { nextPage: number }) => {
  //         return lastPage.nextPage || null;
  //       },
  //       initialPageParam: 1,
  //     });
  //   }
  // );

  return (
    <div className={classes.wrap}>
      {/* 페이지 Banner */}
      <ListPageBanner />

      <Grid.center>
        {/* 검색 or 정렬 */}
        <div className={classes.searchFilterWrapper}>
          <ListFilterControls />
          {/* <SearchInput search={Check boxCheck box""} /> */}
        </div>

        {/**
         * vercel 서버리스 Cold Start 때문에 prefetch에서 Client로 변경함
         */}
        <TemplateList />
      </Grid.center>
    </div>
  );
}
