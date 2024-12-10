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
import { useInfiniteQuery } from "@tanstack/react-query";
import classes from "./TemplateItemlist.module.scss";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";

export default function TemplateList() {
  const qs = useSearchParams();
  const sort = qs.get("sort") || TEMPLATERLIST_SORT.ALL;
  const ref = useRef<HTMLDivElement>(null);

  const { data, isPending, fetchNextPage } =
    useInfiniteQuery<{
      data: TemplateItemMetadata<RespondentsAndMaxGroup>[];
      nextPage: number | null;
    }>({
      queryKey: [QUERY_KEY.TEMPLATE_LIST, sort],
      queryFn: async ({ pageParam = 1 }) => {
        let url = `${BASE_NEST_URL}/template?sort=${sort}`;
        url += `&page=${pageParam}`;

        const response = await fetch(url);
        return await response.json();
      },
      getNextPageParam: (lastPage) => {
        return lastPage.nextPage || null;
      },
      initialPageParam: 1,
      staleTime: 10000,
    });

  useEffect(() => {
    const target = ref.current;
    if (!target) return;

    const ob = new IntersectionObserver(
      (entries: IntersectionObserverEntry[]) => {
        if (entries[0].isIntersecting) {
          // target!.style.backgroundColor = "red";
          fetchNextPage();
        }
      },
      { threshold: 0.4 }
    );

    if (target) {
      ob.observe(target);
    }

    return () => {
      if (target) ob.unobserve(target);
      ob.disconnect();
    };
  }, [ref, fetchNextPage, qs]);

  if (isPending) {
    return "loading....";
  }

  if (!data) {
    return <div>데이터 없음</div>;
  }

  //마지막 잡기
  const lastPage = data.pages.at(-1);
  const lastItem = lastPage?.data.at(-1);

  return (
    <>
      <div className={` ${classes.surveyItemWrapper}`}>
        {data.pages.map((page) => {
          return page.data.map((item) => {
            if (item.respondents.tag === RESPONDENT_TAG.MAXGROUP) {
              return (
                <TemplateItem
                  {...item}
                  respondents={item.respondents}
                  key={`templateItem-${item.id}`}
                  ref={item.id === lastItem?.id ? ref : null}
                />
              );
            }
          });
        })}
      </div>
    </>
  );
}
