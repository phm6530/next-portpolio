"use client";
import TemplateItem from "./TemplateItem";
import { BASE_NEST_URL } from "@/config/base";
import { QUERY_KEY } from "@/types/constans";
import {
  RESPONDENT_TAG,
  RespondentsAndMaxGroup,
  TemplateItemMetadata,
  TEMPLATERLIST_SORT,
} from "@/types/template.type";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";
import LoadingSpiner from "@/components/ui/LoadingSpiner";
import MasonryLayout from "@/components/layout/masonry-layout";
import NotFoundContents from "@/components/ui/error/notfound-contents";
import { Ban } from "lucide-react";
import LoadingWrapper from "@/components/shared/loading/loading-wrapper";

export default function TemplateList() {
  const qs = useSearchParams();
  const sort = qs.get("sort") || TEMPLATERLIST_SORT.ALL;
  const ref = useRef<HTMLDivElement>(
    null
  ) as React.MutableRefObject<HTMLDivElement | null>;

  const { data, isPending, fetchNextPage, isError, isFetching } =
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
    if (!ref.current) return;

    const currentRef = ref.current;

    const ob = new IntersectionObserver(
      (entries: IntersectionObserverEntry[]) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            fetchNextPage();
          }
        });
      },
      { threshold: 0.2 }
    );

    ob.observe(currentRef); // `currentRef`를 사용

    return () => {
      ob.unobserve(currentRef); // `currentRef`를 사용
      ob.disconnect();
    };
  }, [data, fetchNextPage]);

  if (isError) {
    return (
      <NotFoundContents>
        <Ban />
        데이터를 가져오는데 실패하였습니다..
      </NotFoundContents>
    );
  }

  if (isPending) {
    return (
      <div className="relative min-h-[300px]">
        <LoadingSpiner />
      </div>
    );
  }

  if (data?.pages[0].data.length === 0) {
    return <NotFoundContents>생성된 템플릿이 없습니다.</NotFoundContents>;
  }

  //마지막 잡기
  const lastPage = data.pages.at(-1);

  return (
    <>
      <MasonryLayout>
        {data.pages.map((page) => {
          return page.data.map((item) => {
            if (item.respondents.tag === RESPONDENT_TAG.MAXGROUP) {
              return (
                <TemplateItem
                  {...item}
                  respondents={item.respondents}
                  key={`templateItem-${item.id}`}
                />
              );
            }
          });
        })}
      </MasonryLayout>

      {lastPage?.nextPage !== null && (
        <>
          <div ref={ref} className="h-7" />
        </>
      )}
      {/* Infinity Scroll Loading.. */}
      {isFetching && <LoadingWrapper />}
    </>
  );
}
