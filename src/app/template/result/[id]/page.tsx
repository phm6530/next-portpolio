import { fetchDetailResult } from "@/app/_services/client/templateResult";
import { queryClient } from "@/app/config/queryClient";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

import SurveyResult from "@/app/template/result/[id]/_component/SurveyResult";

export default async function resultPage({
  params,
}: {
  params: { id: string };
}) {
  //Id
  const templateId = params.id;

  await queryClient.prefetchQuery({
    queryKey: ["default", params.id],
    queryFn: () => fetchDetailResult(templateId),
    staleTime: 10000,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <SurveyResult id={templateId} />
    </HydrationBoundary>
  );
}
