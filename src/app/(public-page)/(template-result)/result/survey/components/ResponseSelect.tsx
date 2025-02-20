import SurveyResultBar from "@/app/(public-page)/(template-result)/result/survey/components/SurveyResultBar";
import classes from "./ReponseSelect.module.scss";
import IconLabel from "@/components/ui/IconLabel";
import Crown from "/public/asset/icon/crown.svg";
import Person from "/public/asset/icon/person.svg";
import { ResultSelect, ResultSelectOption } from "@/types/surveyResult.type";
import ImageViewer from "@/app/template/_component/ImageViewer";
import AniNumbering from "@/components/animation/AniNumbering";
import AniProgressbar from "@/components/animation/AniProgressbar";
import { AgeOptions, GenderOptions } from "./SurveyGroupFilter";
import QuestionTitle from "@/components/ui/templateUi/QuestionTitle";

export default function sResponseSelect({
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
  const isPictrue = options.some((e) => e.img);

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

  return (
    <>
      <div
        className={`${classes.gridWrapper} ${
          isPictrue ? classes.pictrueGrid : undefined
        }`}
      >
        {sortedOptions.map((option, idx) => {
          const ixMax = maxOption === option;
          const sumUser = sumFilterUsers(option.response);
          const percent = Math.round((sumUser / allCnt) * 100);

          return (
            <div className={classes.item} key={`${option.label}-${idx}`}>
              <div className={classes.questionLabel}>
                {ixMax ? (
                  <IconLabel Icon={Crown}>{option.value}</IconLabel>
                ) : (
                  option.value
                )}
                <span className={classes.cnt}>
                  <Person /> {sumUser}
                </span>
              </div>

              <div className={classes.animationWrapper}>
                {/* Percent */}
                <AniProgressbar maxCnt={ixMax} percent={percent} />
              </div>

              {option.img && (
                <ImageViewer image={option.img} alt={option.value} />
              )}
            </div>
          );
        })}
      </div>
    </>
  );
}
