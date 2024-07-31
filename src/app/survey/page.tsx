import SurveyList from "@/app/survey/_component/survey/surveyList";
import classes from "./surveyPage.modules.scss";
import { queryClient } from "@/app/config/queryClient";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getList } from "@/app/_services/surveySerivce";
import PageTitle from "@/app/_components/ui/PageTitle";

export default async function surveyPage() {
  await queryClient.prefetchQuery({
    queryKey: ["list", "survey"],
    queryFn: getList,
    staleTime: 1000,
  });
  const hydurateState = dehydrate(queryClient);

  console.log(hydurateState);

  console.log("서버컴포넌트 호출");

  return (
    <>
      <div className={classes.wrap}>
        <PageTitle>
          다른사람들은<br></br> 어떤 생각을 가졌는지 알고싶나요?
        </PageTitle>

        {/* List */}
        <HydrationBoundary state={hydurateState}>
          <SurveyList />
        </HydrationBoundary>
      </div>
    </>
  );
}
