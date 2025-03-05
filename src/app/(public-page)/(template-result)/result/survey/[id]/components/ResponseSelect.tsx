import Crown from "/public/asset/icon/crown.svg";
import { ResultSelect, ResultSelectOption } from "@/types/surveyResult.type";
import ZoomableImage from "@/components/ui/image-zoomable";
import AniProgressbar from "@/components/ui/chart-progress/AniProgressbar";
import { AgeOptions, GenderOptions } from "./SurveyGroupFilter";
import { CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { User2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function ResponseSelect({
  allCnt,
  options,
  isAgeCollected,
  isGenderCollected,
}: { allCnt: number } & ResultSelect & {
    idx: number;
    isAgeCollected: boolean;
    isGenderCollected: boolean;
  }) {
  const sumFilterUsers = (arr: ResultSelectOption["response"]) => {
    if (!isAgeCollected && !isGenderCollected) {
      return arr.selectUserCnt;
    }

    //남자 합
    const sumFemale = Object.values(arr.female ?? {}).reduce((arr, cur) => {
      return (arr += cur);
    }, 0);

    //여자 합
    const sumMale = Object.values(arr.male ?? {}).reduce((arr, cur) => {
      return (arr += cur);
    }, 0);

    return sumFemale + sumMale;
  };

  const maxOption = options.reduce((max, option) => {
    const currentSum = sumFilterUsers(option.response);
    const maxSum = sumFilterUsers(max.response);

    return currentSum > maxSum ? option : max;
  }, options[0]);

  const sortedOptions = [...options].sort((a, b) => {
    const sumA = sumFilterUsers(a.response);
    const sumB = sumFilterUsers(b.response);
    return sumB - sumA;
  });

  //d사진 하나라도있으면 그리드 변환
  const isPictureOption = options.some((e) => e.img);

  return (
    <CardContent>
      <div
        className={cn(
          "grid gap-4 ",
          isPictureOption &&
            "grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-10"
        )}
      >
        {sortedOptions.map((option, idx) => {
          const ixMax = maxOption === option;
          const sumUser = sumFilterUsers(option.response);
          const percent = Math.round((sumUser / allCnt) * 100);

          return (
            <div
              className="flex flex-col gap-2 items-start w-full "
              key={`${option.label}-${idx}`}
            >
              <div className="text-zinc-500">
                <div
                  className={cn(
                    " flex items-center gap-2",
                    ixMax && "text-point"
                  )}
                >
                  <span>{option.value}</span>
                  <div className="flex gap-1 items-center border-l pl-3 text-sm">
                    <User2 className="w-3 h-3" /> {sumUser}
                  </div>
                </div>
              </div>

              <div className="grid items-center gap-2 w-full">
                {/* Percent */}
                <AniProgressbar
                  maxCnt={ixMax}
                  optionIdx={idx}
                  percent={percent}
                />
              </div>

              {option.img && (
                <ZoomableImage image={option.img} alt={option.value} />
              )}
            </div>
          );
        })}
      </div>
    </CardContent>
  );
}
