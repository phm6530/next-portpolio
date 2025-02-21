import CommentEditor from "@/app/(public-page)/(template-result)/components/CommentEditor";
import ResultCommentSection from "@/app/(public-page)/(template-result)/components/ResultCommentSection";
import ResultSummry from "@/app/(public-page)/(template-result)/components/ResultSummry";
import ResultSurveyCharts from "@/app/(public-page)/(template-result)/result/survey/[id]/components/SurveyStatsCharts";
import {
  fetchComments,
  fetchSurveyData,
} from "@/app/(public-page)/(template-result)/result/survey/[id]/components/test";
import Grid from "@/components/ui/Grid";
import { CommentEditorProvider } from "@/context/context";
import {
  COMMENT_EDITOR_TYPE,
  COMMENT_NEED_PATH,
  CommentReponse,
} from "@/types/comment.type";

import { QUERY_KEY } from "@/types/constans";
import { SurveyResult } from "@/types/surveyResult.type";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

const queryClient = new QueryClient();

export default async function SurveyResultPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const data = await queryClient.fetchQuery({
    queryKey: [QUERY_KEY.SURVEY_RESULTS, id],
    queryFn: async () => await fetchSurveyData<SurveyResult>(id),
    staleTime: 10000,
  });

  await queryClient.prefetchQuery({
    queryKey: [QUERY_KEY.COMMENTS, id],
    queryFn: async () => {
      return await fetchComments<CommentReponse[]>(
        +id,
        COMMENT_NEED_PATH.TEMPLATE
      );
    },
    staleTime: 10000,
  });

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
      <Grid.smallCenter className="h-full">
        <HydrationBoundary state={dehydrate(queryClient)}>
          <div className="pt-14">
            {/* template Summry */}
            <ResultSummry {...data} />

            <ResultSurveyCharts id={id} />

            <CommentEditorProvider initialSection={COMMENT_NEED_PATH.TEMPLATE}>
              {/* 메인 Comment Editor */}
              <CommentEditor
                editorType={COMMENT_EDITOR_TYPE.COMMENT}
                parentsType={COMMENT_NEED_PATH.TEMPLATE}
                parentsId={id}
              />

              {/* Comments */}
              <ResultCommentSection
                id={parseInt(id, 10)}
                type={COMMENT_NEED_PATH.TEMPLATE}
              />
            </CommentEditorProvider>
          </div>
        </HydrationBoundary>
      </Grid.smallCenter>{" "}
    </>
  );
}
