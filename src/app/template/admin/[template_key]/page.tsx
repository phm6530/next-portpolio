import { queryClient } from "@/app/config/queryClient";
import { QUERY_KEY } from "@/types/constans";

export default async function adminResult({
  params,
}: {
  params: { template_key: string };
}) {
  await queryClient.prefetchQuery({
    queryKey: [QUERY_KEY.TEMPLATE_RESULT_USER_ADMIN],
  });

  return <>{params.template_key} 어드민</>;
}
