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

type ResponseError = {
  message: string;
  error: string;
  statusCode: number;
};

export default async function page() {
  // 고차 컴포넌트
  // const PrefetchTemplstList = await WithPrefetchRender(
  //   TemplateList,
  //   async () => {
  //     await queryClient.prefetchQuery({
  //       queryKey: [QUERY_KEY.TEMPLATE_LIST],
  //       queryFn: async () => {
  //         const response = await fetch(`${BASE_NEST_URL}/template`, {
  //           cache: "no-store",
  //         });
  //         return await response.json();
  //       },
  //       staleTime: 10000,
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
          <SurveyControler />
          {/* <SearchInput search={search} /> */}
        </div>

        <TemplateList />
      </Grid.center>
    </div>
  );
}
