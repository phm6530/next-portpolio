import Grid from "@/components/ui/Grid";
import classes from "./page.module.scss";
import { BASE_NEST_URL } from "@/config/base";
import { QUERY_KEY } from "@/types/constans";
import { WithPrefetchRender } from "@/hoc/WithPrefetchRender";
import SurveyControler from "@/app/template/_component/survey/SurveyControler";
import ListPageBanner from "@/app/list/components/ListPageBanner";
import TemplateList from "@/app/list/components/TemplateItemList";
import { TEMPLATERLIST_SORT } from "@/types/template.type";

export default async function page({
  searchParams,
}: {
  searchParams: { sort: TEMPLATERLIST_SORT };
}) {
  const sort = searchParams.sort || TEMPLATERLIST_SORT.ALL;

  // 고차 컴포넌트
  const PrefetchTemplateList = await WithPrefetchRender(
    TemplateList,
    async (queryClient) => {
      await queryClient.prefetchInfiniteQuery({
        queryKey: [QUERY_KEY.TEMPLATE_LIST, sort],
        queryFn: async ({ pageParam = 1 }) => {
          let url = `${BASE_NEST_URL}/template?sort=${sort}`;
          url += `&page=${pageParam}`;

          const response = await fetch(url, {
            cache: "no-cache",
          });

          return await response.json();
        },
        getNextPageParam: (lastPage: { nextPage: number }) => {
          return lastPage.nextPage || null;
        },
        initialPageParam: 1,
      });
    }
  );

  return (
    <div className={classes.wrap}>
      {/* 페이지 Banner */}
      <ListPageBanner />

      <Grid.center>
        {/* 검색 or 정렬 */}
        <div className={classes.searchFilterWrapper}>
          <SurveyControler />
          {/* <SearchInput search={search} /> */}
        </div>

        <PrefetchTemplateList />
      </Grid.center>
    </div>
  );
}
