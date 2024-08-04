import SurveyList from "@/app/survey/_component/survey/surveyList";
import classes from "./surveyPage.modules.scss";
import PageTitle from "@/app/_components/ui/PageTitle";
import SurveyControler from "@/app/survey/_component/survey/SurveyControler";
import SearchInput from "@/app/_components/ui/SearchInput";
import HotKeyword from "@/app/survey/_component/HotKeyWords";

import Link from "next/link";

import { queryClient } from "@/app/config/queryClient";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getList } from "@/app/_services/surveySerivce";

export default async function surveyPage() {
  await queryClient.prefetchQuery({
    queryKey: ["list", "survey"],
    queryFn: getList,
    staleTime: 1000,
  });
  const hydurateState = dehydrate(queryClient);

  return (
    <>
      <div className={classes.wrap}>
        <PageTitle>
          다른사람들은<br></br> 어떤 생각을 가졌는지 알고싶나요?
        </PageTitle>

        <Link href={"/survey/template"}>설문조사 만들기</Link>
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
