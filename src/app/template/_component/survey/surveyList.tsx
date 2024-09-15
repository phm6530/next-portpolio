"use client";

import classes from "./SurveyList.module.scss";
import SurveyItem from "@/components/survey/SurveyItem";
import PageGsap from "@/components/_aniPage/PageGsap";
import Paging from "@/components/ui/Paging";

import { fetchList } from "@/lib/surveySerivce";
import { GetTemplateMetaLists } from "@/types/template";
import { useQuery } from "@tanstack/react-query";

import { QUERY_KEY, QUERY_STRING } from "@/types/constans";
import { useSearchParams } from "next/navigation";
import NotFoundComponent from "@/components/NotFoundComponent";

export default function SurveyList({
  page,
  sort,
  search,
}: {
  page: number;
  sort?: string;
  search?: string;
}) {
  //하이듀레이션
  const { data, isLoading } = useQuery<GetTemplateMetaLists>({
    queryKey: [QUERY_KEY.TEMPLATE_LIST, page, sort, search],
    queryFn: () => fetchList(page + "", sort, search),
    staleTime: 10000,
  });

  const qs = useSearchParams();
  const keyword = qs.get(QUERY_STRING.SEARCH);

  if (isLoading) {
    return "Loading....";
  }

  return (
    <>
      {data && (
        <>
          <PageGsap page={page + ""}>
            {data.result.length > 0 ? (
              <div className={` ${classes.surveyItemWrapper}`}>
                {data.result.map((item, idx) => {
                  return (
                    <div key={`${item.id}-${idx}`} className="autoAlpha box">
                      <SurveyItem itemData={item} />
                    </div>
                  );
                })}
              </div>
            ) : keyword ? (
              <NotFoundComponent.search keyword={keyword as string} />
            ) : (
              "없네요"
            )}

            {/* <PageGsap></PageGsap> */}
            <Paging cnt={data.cnt} />
          </PageGsap>
        </>
      )}
    </>
  );
}
