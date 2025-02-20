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
import { useCallback, useEffect, useRef } from "react";
import NotFoundComponent from "@/components/NotFoundComponent";
import LoadingSpiner from "@/components/ui/LoadingSpiner";
import MasonryLayout from "@/utils/MasonryLayout";
import { cn } from "@/lib/utils";

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

  // const callbackRef = useCallback(
  //   (div: HTMLDivElement) => {
  //     const ob = new IntersectionObserver(
  //       (entries: IntersectionObserverEntry[]) => {
  //         entries.forEach((entiry) => {
  //           if (entiry.intersectionRect) {
  //             fetchNextPage();
  //           }
  //         });
  //       },
  //       { threshold: 0.2 }
  //     );

  //     if (div) {
  //       ob.observe(div);
  //     }

  //     return () => {
  //       if (div) ob.unobserve(div);
  //       ob.disconnect();
  //     };
  //   },
  //   [fetchNextPage]
  // );

  if (isError) {
    return <NotFoundComponent.noneData />;
  }

  if (isPending) {
    return (
      <div className="relative min-h-[300px]">
        <LoadingSpiner />
      </div>
    );
  }

  if (data?.pages[0].data.length === 0) {
    return <NotFoundComponent.noneData text="생성된 템플릿이 없습니다." />;
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
          <div
            ref={ref}
            style={{
              height: "10px",
              marginTop: "10px",
              backgroundColor: "red",
            }}
          />
        </>
      )}
    </>
  );
}
