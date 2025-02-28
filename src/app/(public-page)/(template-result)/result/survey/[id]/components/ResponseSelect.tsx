import Crown from "/public/asset/icon/crown.svg";
import { ResultSelect, ResultSelectOption } from "@/types/surveyResult.type";
import ZoomableImage from "@/components/ui/image-zoomable";
import AniProgressbar from "@/components/ui/chart-progress/AniProgressbar";
import { AgeOptions, GenderOptions } from "./SurveyGroupFilter";
import { CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export default function ResponseSelect({
  allCnt,
  options,
}: { allCnt: number } & ResultSelect & {
    idx: number;
    selectAgeGroup: AgeOptions;
    selectGenderGroup: GenderOptions;
  }) {
  const sumFilterUsers = (arr: ResultSelectOption["response"]) => {
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

  const isPictureOption = options.some((e) => e.img);
  return (
    <CardContent>
      <div
        className={cn(
          "grid gap-4 ",
          isPictureOption && "grid-cols-[repeat(auto-fit,minmax(250px,1fr))]"
        )}
      >
        {sortedOptions.map((option, idx) => {
          const ixMax = maxOption === option;
          const sumUser = sumFilterUsers(option.response);
          const percent = Math.round((sumUser / allCnt) * 100);

          return (
            <div className="flex flex-col gap-2" key={`${option.label}-${idx}`}>
              <div className="text-zinc-500">
                {ixMax ? (
                  <div className="text-point flex items-center gap-2 ">
                    {/* <div className="w-4 h-4 relative [&>svg]:absolute [&>svg]:w-full [&>svg]:h-full">
                      <Crown />
                    </div> */}

                    {option.value}
                  </div>
                ) : (
                  option.value
                )}
              </div>

              <div className="grid items-center gap-2">
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
