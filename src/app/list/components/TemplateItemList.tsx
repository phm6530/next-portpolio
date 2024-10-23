"use client";
import TemplateItem from "@/app/list/components/TemplateItem";
import { BASE_NEST_URL } from "@/config/base";
import { QUERY_KEY } from "@/types/constans";
import { TemplateItemMetadata } from "@/types/template.type";
import { useQuery } from "@tanstack/react-query";
import classes from "./TemplateItemlist.module.scss";

type ResponseError = {
  message: string;
  error: string;
  statusCode: number;
};

export default function TemplateList() {
  // //prefetch하기
  const { data, isError, isLoading } = useQuery<TemplateItemMetadata[]>({
    queryKey: [QUERY_KEY.TEMPLATE_LIST],
    queryFn: async () => {
      const response = await fetch(`${BASE_NEST_URL}/template`);
      return await response.json();
    },
    staleTime: 10000,
  });

  if (!data) {
    return <div>데이터 없음</div>;
  }

  return (
    <>
      <div className={` ${classes.surveyItemWrapper}`}>
        {data.map((e, idx) => {
          return <TemplateItem {...e} key={`templateItem-${idx}`} />;
        })}
      </div>
    </>
  );
}
