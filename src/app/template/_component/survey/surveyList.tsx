"use client";

import classes from "./SurveyList.module.scss";
import SurveyItem from "@/app/_components/survey/SurveyItem";
import PageGsap from "@/app/_aniPage/PageGsap";
import Paging from "@/app/_components/ui/Paging";

import { fetchList } from "@/app/_services/surveySerivce";
import { GetTemplateMetaLists } from "@/types/template";
import { useQuery } from "@tanstack/react-query";

import { QUERY_KEY, QUERY_STRING } from "@/types/constans";
import { useSearchParams } from "next/navigation";

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

  console.log(data);

  const qs = useSearchParams();
  const test = qs.get(QUERY_STRING.SEARCH);

  if (isLoading) {
    return "Loading....";
  }

  return (
    <>
      {data && (
        <>
          <PageGsap page={page + ""}>
            <div className={`autoAlpha ${classes.surveyItemWrapper}`}>
              {data.result.length > 0 ? (
                data.result.map((item, idx) => {
                  return (
                    <div key={`${item.id}-${idx}`} className="tester">
                      <SurveyItem itemData={item} />
                    </div>
                  );
                })
              ) : (
                <div className="tester">
                  검색하신 &apos;{test}&apos; 일치하는 템플릿이 없네요..
                </div>
              )}
            </div>
            {/* <PageGsap></PageGsap> */}
            <Paging cnt={data.cnt} />
          </PageGsap>
        </>
      )}
    </>
  );
}
