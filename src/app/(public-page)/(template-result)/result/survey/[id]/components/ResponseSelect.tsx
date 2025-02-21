import SurveyResultBar from "@/app/(public-page)/(template-result)/result/survey/[id]/components/SurveyResultBar";
import classes from "./ReponseSelect.module.scss";
import IconLabel from "@/components/ui/IconLabel";
import Crown from "/public/asset/icon/crown.svg";
import Person from "/public/asset/icon/person.svg";
import { ResultSelect, ResultSelectOption } from "@/types/surveyResult.type";
import ZoomableImage from "@/components/ui/image-zoomable";
import AniProgressbar from "@/components/animation/AniProgressbar";
import { AgeOptions, GenderOptions } from "./SurveyGroupFilter";
import { CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export default function ResponseSelect({
  idx,
  allCnt,
  label,
  selectAgeGroup,
  selectGenderGroup,
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
          isPictureOption && "grid-cols-[repeat(auto-fit,minmax(200px,1fr))]"
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
                  <IconLabel className="text-indigo-300" Icon={Crown}>
                    {option.value}
                  </IconLabel>
                ) : (
                  option.value
                )}
                {/* <span className={classes.cnt}>
                  <Person /> {sumUser}
                </span> */}
              </div>

              <div className={classes.animationWrapper}>
                {/* Percent */}
                <AniProgressbar maxCnt={ixMax} percent={percent} />
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
