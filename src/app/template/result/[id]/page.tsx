import { fetchDetailResult } from "@/app/_services/client/templateResult";
import { queryClient } from "@/app/config/queryClient";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { notFound } from "next/navigation";
import { GetTemplateItemProps } from "@/types/template";
import { auth } from "@/auth";
import { withFetch } from "@/app/lib/helperClient";

import CommentSection, {
  MessageProps,
} from "@/app/_components/Comment/CommentSection";
import SurveyResult from "@/app/template/result/[id]/_component/SurveyResult";
import AdminController from "@/app/template/admin/_component/AdminController";
import TemplatePending from "@/app/_components/templateUtill/TemplatePending";
import DateCompareToday from "@/app/lib/DateCompareToday";
import Grid from "@/app/_components/ui/Grid";

interface TemplateData {
  templateMeta: GetTemplateItemProps;
}

//Dynamic Meta
export async function generateMetadata({ params }: { params: { id: number } }) {
  try {
    const data: TemplateData = await queryClient.fetchQuery({
      queryKey: ["default", params.id],
      queryFn: () => fetchDetailResult(params.id),
    });

    if (!data || !data.templateMeta) {
      notFound();
    }

    const metaData = data.templateMeta;

    return {
      title: `결과보기 - ${metaData.title}`,
      description: metaData.description,
    };
  } catch (error) {
    notFound();
  }
}

export default async function resultPage({
  params,
}: {
  params: { id: string };
}) {
  //Id
  const templateId = +params.id;
  const session = await auth();

  const prefetchMetaData = await queryClient.fetchQuery({
    queryKey: ["default", templateId],
    queryFn: () => fetchDetailResult(templateId),
    staleTime: 10000,
  });

  //댓글리스트임
  await queryClient.prefetchQuery({
    queryKey: ["comment"],
    queryFn: () =>
      withFetch<MessageProps[]>(async () => {
        return fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/comment?templateId=${templateId}`,
          {
            cache: "no-cache",
          }
        );
      }),
  });

  const { user_id, start_date, end_date, thumbnail, title, id } =
    prefetchMetaData.templateMeta;

  const dateRange = [start_date, end_date] as [string, string] | [null, null];

  const dayCompare = DateCompareToday();

  //template Gard
  if (
    !(session?.user.user_id !== user_id) ||
    !(session?.user.role === "admin")
  ) {
    if (dateRange.every((e) => e !== null)) {
      const [start, end] = dateRange;

      const templateStatus = dayCompare.isBefore(start)
        ? "pending"
        : dayCompare.isAfter(end)
        ? "after"
        : (null as never);

      if (templateStatus) {
        return (
          <TemplatePending
            dateRange={dateRange}
            thumbnail={thumbnail}
            title={title}
            templateStatus={templateStatus}
          />
        );
      }
    }
  }

  return (
    <>
      <HydrationBoundary state={dehydrate(queryClient)}>
        {session?.user.role === "admin" && (
          <AdminController
            user={session?.user}
            curTemplateType={prefetchMetaData.templateMeta.template}
            curTemplateKey={prefetchMetaData.templateMeta.template_key!}
            startDate={prefetchMetaData.templateMeta.start_date}
            endDate={prefetchMetaData.templateMeta.end_date}
          />
        )}
        <Grid.smallCenter>
          {/* 결과 */}
          <SurveyResult id={templateId} />
          {/* 댓글 */}
          <CommentSection templateId={templateId} />{" "}
        </Grid.smallCenter>
      </HydrationBoundary>
    </>
  );
}
