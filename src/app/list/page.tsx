import { Suspense } from "react";

import Grid from "@/components/ui/Grid";
import classes from "./page.module.scss";
import { queryClient } from "@/config/queryClient";
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
      await queryClient.prefetchQuery({
        queryKey: [QUERY_KEY.TEMPLATE_LIST, sort],
        queryFn: async () => {
          const url = `${BASE_NEST_URL}/template?sort=${sort}`;
          const response = await fetch(url, {
            cache: "no-cache",
          });
          return await response.json();
        },
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
