import { Suspense } from "react";

import Grid from "@/components/ui/Grid";
import Vanner from "@/components/ui/Vanner";
import classes from "./page.module.scss";

import { queryClient } from "@/config/queryClient";
import { BASE_NEST_URL } from "@/config/base";
import SurveyControler from "@/app/template/_component/survey/SurveyControler";

import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import ListPageBanner from "@/app/list/components/ListPageBanner";
import { QUERY_KEY } from "@/types/constans";
import TemplateList from "@/app/list/components/TemplateItemList";
import { WithDynamicRender } from "@/hoc/WithDynamicRender";

type ResponseError = {
  message: string;
  error: string;
  statusCode: number;
};

export default async function page() {
  // 고차 컴포넌트
  const DynamicComponent = await WithDynamicRender(TemplateList, async () => {
    await queryClient.prefetchQuery({
      queryKey: [QUERY_KEY.TEMPLATE_LIST],
      queryFn: async () => {
        const response = await fetch(`${BASE_NEST_URL}/template`);
        return await response.json();
      },
      staleTime: 10000,
    });
  });

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
        <Suspense fallback={<div>loading......???</div>}>
          <DynamicComponent />
        </Suspense>
      </Grid.center>
    </div>
  );
}
