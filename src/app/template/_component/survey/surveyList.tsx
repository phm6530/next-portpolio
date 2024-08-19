"use client";

import classes from "./SurveyList.module.scss";
import SurveyItem from "@/app/_components/survey/SurveyItem";
import PageGsap from "@/app/_aniPage/PageGsap";
import Paging from "@/app/_components/ui/Paging";

import { fetchList } from "@/app/_services/surveySerivce";
import { GetTemplateLists } from "@/types/template";
import { useQuery } from "@tanstack/react-query";

import { QUERY_KEY } from "@/types/constans";

export default function SurveyList({
  page,
  sort,
}: {
  page: number;
  sort?: string;
}) {
  //하이듀레이션
  const { data, isLoading } = useQuery<GetTemplateLists>({
    queryKey: [QUERY_KEY.TEMPLATE_LIST, page, sort],
    queryFn: () => fetchList(page + "", sort),
    staleTime: 10000,
  });

  if (isLoading) {
    return "Loading....";
  }

  return (
    <>
      {data && (
        <>
          <PageGsap page={page + ""}>
            <div className={`autoAlpha ${classes.surveyItemWrapper}`}>
              {data &&
                data.result.map((item, idx) => {
                  return (
                    <div key={`${item.id}-${idx}`} className="tester">
                      <SurveyItem itemData={item} />
                    </div>
                  );
                })}
            </div>
            {/* <PageGsap></PageGsap> */}
            <Paging cnt={data.cnt} />
          </PageGsap>
        </>
      )}
    </>
  );
}
