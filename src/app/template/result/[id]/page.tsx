import { fetchDetailResult } from "@/app/_services/client/templateResult";
import { queryClient } from "@/app/config/queryClient";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

import SurveyResult from "@/app/template/result/[id]/_component/SurveyResult";
import { notFound } from "next/navigation";
import { GetTemplateItemProps } from "@/types/template";
import CommentSection, {
  MessageProps,
} from "@/app/_components/Comment/CommentSection";
import { withFetch } from "@/app/lib/helperClient";
import AdminController from "@/app/template/admin/_component/AdminController";
import { auth } from "@/auth";

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

  return (
    <>
      <HydrationBoundary state={dehydrate(queryClient)}>
        {session?.user.role === "admin" && (
          <AdminController
            user={session?.user}
            curTemplateKey={prefetchMetaData.templateMeta.template_key}
          />
        )}
        {/* Result */}
        <SurveyResult id={templateId} />

        {/* 댓글 */}
        <CommentSection templateId={templateId} />
      </HydrationBoundary>
    </>
  );
}
