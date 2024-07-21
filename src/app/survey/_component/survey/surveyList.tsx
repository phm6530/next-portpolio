"use client";

import SurveyItem from "@/app/survey/_component/survey/surverItem";
import { getList } from "@/app/survey/page";
import { useQuery } from "@tanstack/react-query";

type SurveyProp = {
  id: number;
  title: string;
};

export default function SurveyList() {
  const { data, isLoading, isError } = useQuery<SurveyProp[]>({
    queryKey: ["list", "survey"],
    queryFn: getList,
    staleTime: 1000,
  });

  if (isLoading) {
    return <div>Loading....</div>;
  }

  if (isError) {
    return <div>Error....</div>;
  }
  // console.log(data);

  return (
    <>
      {data &&
        data.map((item, idx) => {
          return (
            <SurveyItem
              key={`${item}-${idx}`}
              id={item.id}
              title={item.title}
            />
          );
        })}
    </>
  );
}
