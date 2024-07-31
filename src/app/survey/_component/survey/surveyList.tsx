"use client";

import { getList } from "@/app/_services/surveySerivce";
import SurveyItem from "@/app/survey/_component/survey/surverItem";
import SurveyControler from "@/app/survey/_component/survey/SurveyControler";

import { SurveyItemProps } from "@/types/survey";
import { useQuery } from "@tanstack/react-query";
import classes from "./SurveyList.module.scss";
import SearchInput from "@/app/_components/ui/SearchInput";

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
      {/* btn Area */}
      <SurveyControler />

      <SearchInput />

      <div className={classes.surveyItemWrapper}>
        {data &&
          data.map((item, idx) => {
            return <SurveyItem key={`${item}-${idx}`} itemData={item} />;
          })}
      </div>
    </>
  );
}
