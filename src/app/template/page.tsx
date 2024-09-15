import SurveyList from "@/app/template/_component/survey/surveyList";

import PageTitle from "@/components/ui/PageTitle";
import SurveyControler from "@/app/template/_component/survey/SurveyControler";
import SearchInput from "@/components/ui/SearchInput";

import { queryClient } from "@/config/queryClient";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { fetchList } from "@/lib/surveySerivce";

import { QUERY_KEY } from "@/types/constans";
import Grid from "@/components/ui/Grid";
import Vanner from "@/components/ui/Vanner";
import Button from "@/components/ui/button/Button";

import classes from "./surveyPage.module.scss";
import TemplateCractor from "@/components/Cractor/TemplateCractor";

export default async function surveyPage({
  searchParams,
}: {
  searchParams: { page: string; sort?: string; search?: string };
}) {
  // search
  const page = +searchParams.page || 1;
  const sort = searchParams.sort;
  const search = searchParams.search;

  await queryClient.prefetchQuery({
    queryKey: [QUERY_KEY.TEMPLATE_LIST, page, sort, search],
    queryFn: () => fetchList(page + "", sort, search),
    staleTime: 10000,
  });
  const hydurateState = dehydrate(queryClient);

  return (
    <>
      <div className={classes.wrap}>
        <Vanner>
          <Grid.center>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div>
                <PageTitle>
                  다른사람들은<br></br> 어떤
                  <div className="pointText">생각</div>을 가졌는지 궁금하신가요?
                </PageTitle>

                <p className={classes.description}>
                  평소에 궁금했던 질문을 익명의 장점을 살려 질문해보세요!
                </p>

                <Button.moveLink moveUrl={"/template/made"}>
                  + 설문조사 만들기
                </Button.moveLink>
              </div>
              <TemplateCractor />
            </div>
          </Grid.center>
        </Vanner>

        <Grid.center>
          {/* btn Area */}
          <div className={classes.searchFilterWrapper}>
            {/* <HotKeyword /> */}

            <SurveyControler />
            <SearchInput search={search} />
          </div>
          {/* List */}
          <HydrationBoundary state={hydurateState}>
            <SurveyList page={page} sort={sort} search={search} />
          </HydrationBoundary>
        </Grid.center>
      </div>
    </>
  );
}
