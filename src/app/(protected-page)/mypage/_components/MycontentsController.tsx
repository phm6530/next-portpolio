import { QUERY_KEY } from "@/types/constans";
import {
  RespondentsAndMaxGroup,
  TEMPLATE_TYPE,
  TemplateItemMetadata,
} from "@/types/template.type";
import withAuthFetch from "@/utils/withAuthFetch";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function MyContentsController({
  templateType,
  id,
}: {
  templateType: TEMPLATE_TYPE;
  id: number;
}) {
  const queryClient = useQueryClient();

  const { mutate } = useMutation<
    unknown,
    Error,
    Pick<TemplateItemMetadata<RespondentsAndMaxGroup>, "id" | "templateType">
  >({
    mutationFn: async ({ templateType, id }) => {
      const url = `template/${templateType}/${id}`;

      const options: RequestInit = {
        method: "DELETE",
        credentials: "include",
      };
      const response = await withAuthFetch(url, options);
      return response;
    },

    onSuccess: () => {
      alert("삭제되었습니다.");
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.MY_CONTENTS],
      });
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
