import CommentEditor from "@/app/(template-result)/components/CommentEditor";
import ResultCommentSection from "@/app/(template-result)/components/ResultCommentSection";
import ResultSummry from "@/app/(template-result)/components/ResultSummry";
import ResultSurveyCharts from "@/app/(template-result)/result/survey/components/SurveyStatsCharts";
import { fetchSurveyData } from "@/app/(template-result)/result/survey/components/test";
import { BASE_NEST_URL } from "@/config/base";
import { queryClient } from "@/config/queryClient";
import { WithPrefetchRender } from "@/hoc/WithPrefetchRender";
import { QUERY_KEY } from "@/types/constans";
import { SurveyResult } from "@/types/surveyResult.type";
import requestHandler from "@/utils/withFetch";
import { Metadata } from "next";

export async function generateMetadata({
  params: { id },
}: {
  params: { id: string };
}): Promise<Metadata> {
  const data = await queryClient.fetchQuery({
    queryKey: [QUERY_KEY.SURVEY_RESULTS, id],
    queryFn: async () => await fetchSurveyData<SurveyResult>(id),
    staleTime: 10000,
  });

  return {
    title: data.title,
    description: data.description,
    openGraph: {
      title: data.title,
      description: data.description,
    },
  };
}

export default async function SurveyResultPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const type = "survey";

  console.log("id:::", id);

  const PrefetchComment = await WithPrefetchRender(
    ResultCommentSection,
    async () => {
      await queryClient.prefetchQuery({
        queryKey: [QUERY_KEY.COMMENTS, id],
        queryFn: async () =>
          await requestHandler(async () => {
            return fetch(`${BASE_NEST_URL}/comment/${type}/${id}`, {
              cache: "no-store",
            });
          }),
        staleTime: 10000,
      });
    }
  );

  const PrefetchSurveyCharts = await WithPrefetchRender(
    ResultSurveyCharts,
    async () => {
      await queryClient.prefetchQuery({
        queryKey: [QUERY_KEY.SURVEY_RESULTS, id],
        queryFn: async () => await fetchSurveyData<SurveyResult>(id),
        staleTime: 10000,
      });
    }
  );

  return (
    <>
      {/* template Summry */}
      <ResultSummry id={id} />

      <PrefetchSurveyCharts id={id} />

      {/* 메인 Comment Editor */}
      <CommentEditor id={id} />

      {/* Comments */}
      <PrefetchComment id={id} type={type} />
    </>
  );
}
