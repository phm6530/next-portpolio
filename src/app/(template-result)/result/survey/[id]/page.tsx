import CommentEditor from "@/app/(template-result)/components/CommentEditor";
import ResultCommentSection from "@/app/(template-result)/components/ResultCommentSection";
import ResultSummry from "@/app/(template-result)/components/ResultSummry";
import ResultSurveyCharts from "@/app/(template-result)/result/survey/components/SurveyStatsCharts";
import {
  fetchComments,
  fetchSurveyData,
} from "@/app/(template-result)/result/survey/components/test";
import { CommentReponse } from "@/types/comment.type";

import { QUERY_KEY } from "@/types/constans";
import { SurveyResult } from "@/types/surveyResult.type";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

type StringToNumber<T extends string> = T extends `${infer R extends number}`
  ? R
  : never;

const test = "1d++";

type testProps = StringToNumber<typeof test>;

//이건 매번 생성될텐데 뭐지?

// export async function generateMetadata({
//   params: { id },
// }: {
//   params: { id: string };
// }): Promise<Metadata> {
//   // 인스턴스 생성

//   const data = await queryClient.fetchQuery({
//     queryKey: [QUERY_KEY.SURVEY_RESULTS, id],
//     queryFn: async () => await fetchSurveyData<SurveyResult>(id),
//   });

//   return {
//     title: data.title,
//     description: data.description,
//     openGraph: {
//       title: data.title,
//       description: data.description,
//     },
//   };
// }

export enum COMMENT_EDITOR_TYPE {
  COMMENT = "comment",
  REPLY = "reply",
}

export enum COMMENT_NEED_PATH {
  TEMPLATE = "template",
  BOARD = "board",
}

export default async function SurveyResultPage({
  params: { id },
}: {
  params: { id: string };
}) {
  // 싱글톤
  const queryClient = new QueryClient();
  const data = await queryClient.fetchQuery({
    queryKey: [QUERY_KEY.SURVEY_RESULTS, id],
    queryFn: async () => await fetchSurveyData<SurveyResult>(id),
  });

  await queryClient.prefetchQuery({
    queryKey: [QUERY_KEY.COMMENTS, id],
    queryFn: async () => {
      return await fetchComments<CommentReponse[]>(
        +id,
        COMMENT_NEED_PATH.TEMPLATE
      );
    },
  });

  return (
    <>
      <HydrationBoundary state={dehydrate(queryClient)}>
        {/* template Summry */}
        <ResultSummry {...data} />

        <ResultSurveyCharts id={id} />

        {/* 메인 Comment Editor */}
        <CommentEditor
          editorType={COMMENT_EDITOR_TYPE.COMMENT}
          parentsType={COMMENT_NEED_PATH.TEMPLATE}
          parentsId={+id}
        />

        {/* Comments */}
        <ResultCommentSection id={+id} type={COMMENT_NEED_PATH.TEMPLATE} />
      </HydrationBoundary>
    </>
  );
}
