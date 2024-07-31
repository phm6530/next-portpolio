"use client";

import { getList } from "@/app/_services/surveySerivce";
import SurveyItem from "@/app/survey/_component/survey/surverItem";

import { SurveyItemProps } from "@/types/survey";
import { useQuery } from "@tanstack/react-query";

export default function SurveyList() {
  const { data, isLoading } = useQuery<SurveyItemProps[]>({
    queryKey: ["list", "survey"],
    queryFn: getList,
    staleTime: 1000,
  });

  if (isLoading) {
    return "Loading....";
  }

  return (
    <>
      {data &&
        data.map((item, idx) => {
          return <SurveyItem key={`${item}-${idx}`} itemData={item} />;
        })}
    </>
  );
}
