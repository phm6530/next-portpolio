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

export default async function surveyPage() {
  await queryClient.prefetchQuery({
    queryKey: ["list", "survey"],
    queryFn: fetchList,
    staleTime: 1000,
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
          <SurveyList />
        </HydrationBoundary>
      </div>
    </>
  );
}
