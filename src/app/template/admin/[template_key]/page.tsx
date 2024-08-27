import CommentSection, {
  MessageProps,
} from "@/app/_components/Comment/CommentSection";
import { fetchDetailResult } from "@/app/_services/client/templateResult";
import { queryClient } from "@/app/config/queryClient";
import { withFetch } from "@/app/lib/helperClient";
import { withConnection } from "@/app/lib/helperServer";
import AdminController from "@/app/template/admin/_component/AdminController";
import SurveyResult from "@/app/template/result/[id]/_component/SurveyResult";
import { auth } from "@/auth";

import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { RowDataPacket } from "mysql2";
import { notFound } from "next/navigation";

export default async function adminResult({
  params,
}: {
  params: { template_key: string };
}) {
  const session = await auth();
  const [rows] = await withConnection(async (conn) => {
    const sql = `SELECT id FROM template_meta where template_key = ?;`;
    return conn.query<RowDataPacket[]>(sql, [params.template_key]);
  });

  //쿼리문 결과가 없으면
  if (!rows[0]) {
    notFound();
  }
  const templateId = +rows[0].id;
  const prefetchData = await queryClient.fetchQuery({
    queryKey: ["default", templateId],
    queryFn: () => fetchDetailResult(rows[0].id),
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
  const { template } = prefetchData.templateMeta;

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <AdminController
        user={session?.user}
        curTemplateType={template}
        curTemplateKey={params.template_key}
      />
      <SurveyResult id={templateId} />
      {/* 댓글 */}
      <CommentSection templateId={templateId} />
    </HydrationBoundary>
  );
}
