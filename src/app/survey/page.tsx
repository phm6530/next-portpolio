import SurveyList from "@/app/survey/_component/survey/surveyList";
import classes from "./surveyPage.modules.scss";
import { queryClient } from "@/app/config/queryClient";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

type SurveyProp = {
  id: number;
  title: string;
};

export async function getList(): Promise<SurveyProp[]> {
  try {
    const response = await fetch("/api/survey/list");
    if (!response.ok) {
      throw new Error("서버 이상");
    }
    return response.json();
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("알 수 없는 에러");
    }
  }
}

export default async function surveyPage() {
  await queryClient.prefetchQuery({
    queryKey: ["list", "survey"],
    queryFn: getList,
  });
  const hydurateState = dehydrate(queryClient);

  return (
    <>
      survey Page
      <div className={classes.wrap}>
        {/* List */}
        <HydrationBoundary state={hydurateState}>
          <SurveyList />
        </HydrationBoundary>
      </div>
    </>
  );
}
