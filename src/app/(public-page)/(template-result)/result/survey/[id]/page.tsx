import ResultSurveyCharts from "@/app/(public-page)/(template-result)/result/survey/[id]/components/SurveyStatsCharts";
import {
  fetchComments,
  fetchSurveyData,
} from "@/app/(public-page)/(template-result)/result/survey/[id]/components/test";

import Grid from "@/components/ui/Grid";
import { MSG_TYPE, MSG_PARAM_PATH, CommentReponse } from "@/types/comment.type";

import { QUERY_KEY } from "@/types/constans";
import { SurveyResult } from "@/types/surveyResult.type";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { CommentEditorProvider } from "@/components/comment/context/comment-context";
import MessageForm from "@/components/comment/message-form";
import ResultPageSummry from "../../components/result-page-summry";
import ResultCommentSection from "../../components/ResultCommentSection";

const queryClient = new QueryClient();

export default async function SurveyResultPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const [data] = await Promise.all([
    queryClient.fetchQuery({
      queryKey: [QUERY_KEY.SURVEY_RESULTS, id],
      queryFn: async () => await fetchSurveyData<SurveyResult>(id),
      staleTime: 10000,
    }),
    queryClient.prefetchQuery({
      queryKey: [QUERY_KEY.COMMENTS, id],
      queryFn: async () =>
        await fetchComments<CommentReponse[]>(+id, MSG_PARAM_PATH.TEMPLATE),
      staleTime: 10000,
    }),
  ]);

  // console.log("🚀 서버에서 prefetch된 데이터:", dehydrate(queryClient));
  return (
    <>
      <div className="absolute w-full z-[-1]  h-[50vh] opacity-40">
        <div
          className="w-full h-full absolute z-[-1] bg-center bg-cover bg-no-repeat"
          style={{
            backgroundImage: `url(${data?.thumbnail})`,
          }}
        />
        <div className="absolute inset-0 z-[-1] bg-gradient-to-t from-background background/70  to-transparent" />
      </div>
      <Grid.smallCenter className="h-full animate-fadein ">
        <HydrationBoundary state={dehydrate(queryClient)}>
          <div className="pt-14">
            {/* template Summry */}
            <ResultPageSummry {...data} />

            <ResultSurveyCharts templateId={id} />

            {/* Editor  */}
            <CommentEditorProvider EDITOR_PATH={MSG_PARAM_PATH.TEMPLATE}>
              {/* Comment Editor */}
              <MessageForm parentsId={id} EDITOR_MODE={MSG_TYPE.COMMENT} />

              {/* Comments */}
              <ResultCommentSection
                id={parseInt(id, 10)}
                type={MSG_PARAM_PATH.TEMPLATE}
              />
            </CommentEditorProvider>
          </div>
        </HydrationBoundary>
      </Grid.smallCenter>
    </>
  );
}
