import SurveyList from "@/app/template/_component/survey/surveyList";
import classes from "./surveyPage.modules.scss";
import PageTitle from "@/app/_components/ui/PageTitle";
import SurveyControler from "@/app/template/_component/survey/SurveyControler";
import SearchInput from "@/app/_components/ui/SearchInput";
import HotKeyword from "@/app/template/_component/HotKeyWords";

import { queryClient } from "@/app/config/queryClient";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { fetchList } from "@/app/_services/surveySerivce";
import { Metadata } from "next";
import { QUERY_KEY } from "@/types/constans";
import Grid from "@/app/_components/ui/Grid";
import Vanner from "@/app/_components/ui/Vanner";
import Button from "@/app/_components/ui/button/Button";
import girlCractor from "/public/asset/girl_template.png";
import Image from "next/image";

//메타설정
export const metadata: Metadata = {
  title: "나만의 설문조사를 만들어보세요",
  description: "익명의 장점을 살려 물어보기 어려웠던 정보를 공유해보세요!",
};

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
            <div style={{ display: "flex", alignItems: "center" }}>
              <div>
                <PageTitle>
                  다른사람들은<br></br> 어떤 생각을 가졌는지 알고싶나요?
                </PageTitle>
                <p>평소에 궁금했던 질문을 익명의 장점을 살려 질문해보세요!</p>
                <Button.submit moveUrl={"/template/made"}>
                  설문조사 만들기
                </Button.submit>
              </div>
              <div>
                <Image src={girlCractor} alt="girlCractor" priority />
              </div>
            </div>
          </Grid.center>
        </Vanner>

        <Grid.center>
          {/* btn Area */}
          <SurveyControler />

          <SearchInput search={search} />
          <HotKeyword />
          {/* List */}
          <HydrationBoundary state={hydurateState}>
            <SurveyList page={page} sort={sort} search={search} />
          </HydrationBoundary>
        </Grid.center>
      </div>
    </>
  );
}
