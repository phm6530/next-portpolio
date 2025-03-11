import { QUERY_KEY, REQUEST_METHOD } from "@/types/constans";
import {
  RespondentsAndMaxGroup,
  TEMPLATE_TYPE,
  TemplateItemMetadata,
} from "@/types/template.type";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { withFetchRevaildationAction } from "@/utils/with-fetch-revaildation";
import withActionAtClient from "@/utils/with-action-at-client";
import { toast } from "react-toastify";

export default function MyContentsController({
  templateType,
  id,
}: {
  templateType: TEMPLATE_TYPE;
  id: number;
}) {
  const queryClient = useQueryClient();

  const router = useRouter();

  const { mutate } = useMutation<
    unknown,
    Error,
    Pick<TemplateItemMetadata<RespondentsAndMaxGroup>, "id" | "templateType">
  >({
    mutationFn: async ({ templateType, id }) => {
      await withActionAtClient(async () =>
        withFetchRevaildationAction({
          endPoint: `template/${templateType}/${id}`,
          requireAuth: true,
          options: {
            method: REQUEST_METHOD.DELETE,
          },
          tags: [`template-${templateType}-${+id}`],
        })
      );
    },

    onSuccess: () => {
      toast.success("삭제되었습니다.");
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.MY_CONTENTS],
      });
      router.refresh();
    },
  });

  const templateDeleteHanlder = ({
    templateType,
    id,
  }: Pick<
    TemplateItemMetadata<RespondentsAndMaxGroup>,
    "id" | "templateType"
  >) => {
    confirm("삭제 하시겠습니까? \n삭제 시 영구 삭제되어 복구할 수 없습니다.") &&
      mutate({ templateType, id });
  };

  return (
    <div className="flex gap-1">
      <Button asChild variant={"outline"} size={"sm"}>
        <Link href={`/result/${templateType}/${id}`}> 결과페이지</Link>
      </Button>

      <Button asChild variant={"outline"} size={"sm"}>
        <Link href={`/made/${templateType}?edit=${id}`}>수정</Link>
      </Button>

      <Button
        variant={"outline"}
        size={"sm"}
        onClick={() =>
          templateDeleteHanlder({
            templateType,
            id,
          })
        }
      >
        삭제
      </Button>
    </div>
  );
}
