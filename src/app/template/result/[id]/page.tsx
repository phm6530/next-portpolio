import { fetchDetailResult } from "@/app/_services/client/templateResult";
import { queryClient } from "@/app/config/queryClient";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

import SurveyResult from "@/app/template/result/[id]/_component/SurveyResult";
import { notFound } from "next/navigation";
import { templateItemProps } from "@/types/template";

interface TemplateData {
  templateMeta: templateItemProps;
}

//Dynamic Meta
export async function generateMetadata({ params }: { params: { id: string } }) {
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
