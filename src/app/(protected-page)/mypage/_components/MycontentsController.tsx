import { QUERY_KEY } from "@/types/constans";
import classes from "./MycontentsController.module.scss";
import {
  RespondentsAndMaxGroup,
  TEMPLATE_TYPE,
  TemplateItemMetadata,
} from "@/types/template.type";
import withAuthFetch from "@/utils/withAuthFetch";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/button/Button";

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
    <div className={classes.Controller}>
      <Button.outlineButton
        onClick={() => router.push(`/result/${templateType}/${id}`)}
      >
        결과페이지
      </Button.outlineButton>

      <Button.outlineButton
        onClick={() => router.push(`/made/${templateType}?edit=${id}`)}
      >
        수정
      </Button.outlineButton>

      <Button.outlineButton
        onClick={() =>
          templateDeleteHanlder({
            templateType,
            id,
          })
        }
      >
        삭제
      </Button.outlineButton>
    </div>
  );
}
