"use client";
import TemplateItem from "@/app/list/components/TemplateItem";
import { BASE_NEST_URL } from "@/config/base";
import { QUERY_KEY } from "@/types/constans";
import {
  RESPONDENT_TAG,
  RespondentsAndMaxGroup,
  TemplateItemMetadata,
  TEMPLATERLIST_SORT,
} from "@/types/template.type";
import { useQuery } from "@tanstack/react-query";
import classes from "./TemplateItemlist.module.scss";
import { useSearchParams } from "next/navigation";
import requestHandler from "@/utils/withFetch";

export default function TemplateList() {
  const qs = useSearchParams();
  const sort = qs.get("sort") || TEMPLATERLIST_SORT.ALL;

  //prefetch하기
  const { data, isLoading, isPending } = useQuery<
    TemplateItemMetadata<RespondentsAndMaxGroup>[]
  >({
    queryKey: [QUERY_KEY.TEMPLATE_LIST, sort],
    queryFn: async () => {
      return await requestHandler(async () => {
        //정렬도 같이 넘김
        const url = `${BASE_NEST_URL}/template?sort=${sort}`;
        return await fetch(url, {
          cache: "no-store",
        });
      });
    },
  });

  if (isPending) {
    return "loading....";
  }

  if (!data) {
    return <div>데이터 없음</div>;
  }

  console.log(data);

  return (
    <>
      <div className={` ${classes.surveyItemWrapper}`}>
        {data.map((e) => {
          if (e.respondents.tag === RESPONDENT_TAG.MAXGROUP) {
            return (
              <TemplateItem
                {...e}
                respondents={e.respondents}
                key={`templateItem-${e.id}`}
              />
            );
          }
        })}
      </div>
    </>
  );
}
