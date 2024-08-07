"use client";

import { getList } from "@/app/_services/surveySerivce";
import { SurveyItemProps } from "@/types/survey";
import { useQuery } from "@tanstack/react-query";

import classes from "./SurveyList.module.scss";
import SurveyItem from "@/app/_components/survey/SurveyItem";
import PageGsap from "@/app/_aniPage/PageGsap";

export default function SurveyList() {
  //하이듀레이션
  const { data, isLoading } = useQuery<SurveyItemProps[]>({
    queryKey: ["list", "surveylist"],
    queryFn: getList,
    staleTime: 10000,
  });

  if (isLoading) {
    return "Loading....";
  }

  return (
    <PageGsap>
      <div className={`ani-surveyList ${classes.surveyItemWrapper}`}>
        {data &&
          data.map((item, idx) => {
            return (
              <div key={`${item}-${idx}`} className="tester autoAlpha">
                <SurveyItem itemData={item} />
              </div>
            );
          })}
      </div>
    </PageGsap>
  );
}
