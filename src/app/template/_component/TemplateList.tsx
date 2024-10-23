import SurveyControler from "@/app/template/_component/survey/SurveyControler";
import SurveyList from "@/app/template/_component/survey/surveyList";
import Grid from "@/components/ui/Grid";
import SearchInput from "@/components/ui/SearchInput";
import { fetchList } from "@/lib/surveySerivce";

import classes from "./TemplateList.module.scss";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { queryClient } from "@/config/queryClient";
import { BASE_NEST_URL } from "@/config/base";

type ResponseError = {
  message: string;
  error: string;
  statusCode: number;
};

export default async function TemplateList({
  page,
  sort,
  search,
}: {
  page: string;
  sort?: string;
  search?: string;
}) {
  // search
  const curPage = +page || 1;

  await queryClient.prefetchQuery({
    queryKey: ["templateList"],
    queryFn: async (): Promise<ResponseError> => {
      const response = await fetch(`${BASE_NEST_URL}/template`);
      return response.json();
    },
    staleTime: 10000,
  });

  return (
    <Grid.center>
      {/* btn Area */}
      <div className={classes.searchFilterWrapper}>
        {/* <HotKeyword /> */}
        <SurveyControler />
        <SearchInput search={search} />
      </div>

      {/* List */}
      <HydrationBoundary state={dehydrate(queryClient)}>
        <SurveyList curPage={curPage} sort={sort} search={search} />
      </HydrationBoundary>
    </Grid.center>
  );
}
