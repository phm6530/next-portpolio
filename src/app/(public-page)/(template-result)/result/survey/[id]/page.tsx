import ResultSurveyCharts from "@/app/(public-page)/(template-result)/result/survey/[id]/components/SurveyStatsCharts";
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
import { withFetchRevaildationAction } from "@/action/with-fetch-revaildation";

const queryClient = new QueryClient();

export default async function SurveyResultPage({
  params: { id },
}: {
  params: { id: string };
}) {
  // 서버액션은 새로운 것을 매번 가져옴 no-store이기 때문에
  const data = await queryClient.fetchQuery({
    queryKey: [QUERY_KEY.SURVEY_RESULTS, id],
    queryFn: async () => {
      const result: {
        success: boolean;
        result?: SurveyResult;
        message?: string;
      } = await withFetchRevaildationAction({
        endPoint: `answer/survey/${id}`,
        options: {
          cache: "force-cache",
          next: {
            tags: [`${QUERY_KEY.SURVEY_RESULTS}-${id}`],
          },
        },
      });
      if (!result.success) {
        throw new Error(result.message);
      }
      return result.result;
    },
  });

  return (
    <>
      <Grid.smallCenter className="h-full animate-fadein ">
        <HydrationBoundary state={dehydrate(queryClient)}>
          <div className="pt-14 relative">
            {/* template Summry */}
            {data && <ResultPageSummry {...data} />}

            <ResultSurveyCharts templateId={id} />

            {/* Editor  */}
            <CommentEditorProvider EDITOR_PATH={MSG_PARAM_PATH.TEMPLATE}>
              {/* Comment Editor */}
              <MessageForm parentsId={id} EDITOR_MODE={MSG_TYPE.COMMENT} />

              {/* Comments */}
              <ResultCommentSection id={parseInt(id, 10)} />
            </CommentEditorProvider>
          </div>
        </HydrationBoundary>
      </Grid.smallCenter>
    </>
  );
}
