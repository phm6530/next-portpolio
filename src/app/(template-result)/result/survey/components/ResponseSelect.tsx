import QuestionTitle from "@/app/(template-result)/components/ui/Queston-title.ui";
import SurveyResultBar from "@/app/(template-result)/result/survey/components/SurveyResultBar";
import classes from "./ReponseSelect.module.scss";
import IconLabel from "@/components/ui/IconLabel";
import Crown from "/public/asset/icon/crown.svg";
import { ResultSelect, ResultSelectOption } from "@/types/surveyResult.type";

export default function ResponseSelect({
  allCnt,
  label,
  options,
}: { allCnt: number } & ResultSelect) {
  const isPictrue = options.some((e) => e.optionPicture);

  // options.forEach((e) => {
  //   if(e ==)
  // });

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
      <QuestionTitle>{label}</QuestionTitle>
      <div
        className={`${classes.optionsContainer} ${
          isPictrue ? classes.pictrueGrid : undefined
        }`}
      >
        {sortedOptions.map((option, idx) => {
          const ixMax = maxOption === option;
          const sumUser = sumFilterUsers(option.response);

          return (
            <div key={idx}>
              <div className={classes.questionLabel}>
                {ixMax ? (
                  <IconLabel Icon={Crown}>{option.label}</IconLabel>
                ) : (
                  option.label
                )}
                {option.value}
                <span>({sumUser} 명)</span>
              </div>

              {/* Percent */}
              <SurveyResultBar
                curCnt={sumUser}
                allCnt={allCnt}
                maxCnt={ixMax}
              />
              {/* {e.picture && <ImageViewer image={e.picture} alt={e.label} />} */}
            </div>
          );
        })}
      </div>
    </>
  );
}
