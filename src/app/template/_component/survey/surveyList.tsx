"use client";

import { fetchList } from "@/app/_services/surveySerivce";
import { templateItemProps } from "@/types/template";
import { useQuery } from "@tanstack/react-query";

import classes from "./SurveyList.module.scss";
import SurveyItem from "@/app/_components/survey/SurveyItem";
import PageGsap from "@/app/_aniPage/PageGsap";

export default function SurveyList() {
  //하이듀레이션
  const { data, isLoading } = useQuery<templateItemProps[]>({
    queryKey: ["list", "surveylist"],
    queryFn: fetchList,
    staleTime: 10000,
  });

  if (isLoading) {
    return "Loading....";
  }
  console.log(data);

  return (
    <PageGsap>
      <div className={`ani-surveyList ${classes.surveyItemWrapper}`}>
        {data &&
          data.map((item, idx) => {
            return (
              <div key={`${item.id}-${idx}`} className="tester autoAlpha">
                111
                <SurveyItem itemData={item} />
              </div>
            );
          })}
      </div>
    </PageGsap>
  );
}
