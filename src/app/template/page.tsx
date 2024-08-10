import SurveyList from "@/app/template/_component/survey/surveyList";
import classes from "./surveyPage.modules.scss";
import PageTitle from "@/app/_components/ui/PageTitle";
import SurveyControler from "@/app/template/_component/survey/SurveyControler";
import SearchInput from "@/app/_components/ui/SearchInput";
import HotKeyword from "@/app/template/_component/HotKeyWords";

import Link from "next/link";

import { queryClient } from "@/app/config/queryClient";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { fetchList } from "@/app/_services/surveySerivce";
import { Metadata } from "next";

//메타설정
export const metadata: Metadata = {
  title: "나만의 설문조사를 만들어보세요",
  description: "익명의 장점을 살려 물어보기 어려웠던 정보를 공유해보세요!",
};

export default async function surveyPage({
  searchParams,
}: {
  searchParams: { page: string };
}) {
  const page = +searchParams.page || 1;
  console.log(page);

  await queryClient.prefetchQuery({
    queryKey: ["list", "survey", page],
    queryFn: () => fetchList(page + ""),
    staleTime: 10000,
  });
  const hydurateState = dehydrate(queryClient);

  return (
    <>
      <div className={classes.wrap}>
        <PageTitle>
          다른사람들은<br></br> 어떤 생각을 가졌는지 알고싶나요?
        </PageTitle>

        <Link href={"/template/type"}>설문조사 만들기</Link>
        {/* btn Area */}
        <SurveyControler />
        <HotKeyword />

        <SearchInput />

        {/* List */}
        <HydrationBoundary state={hydurateState}>
          <SurveyList page={page} />
        </HydrationBoundary>
      </div>
    </>
  );
}
