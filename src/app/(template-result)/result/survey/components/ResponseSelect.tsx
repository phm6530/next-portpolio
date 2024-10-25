import QuestionTitle from "@/app/(template-result)/components/ui/Queston-title.ui";
import SurveyResultBar from "@/app/(template-result)/result/survey/components/SurveyResultBar";
import classes from "./ReponseSelect.module.scss";
import IconLabel from "@/components/ui/IconLabel";
import Crown from "/public/asset/icon/crown.svg";
import { ResultSelect } from "@/types/surveyResult.type";

export default function ResponseSelect({
  allCnt,
  label,
  options,
}: { allCnt: number } & ResultSelect) {
  const isPictrue = options.some((e) => e.optionPicture);

  const maxOption = options.reduce((max: typeof option, option) => {
    return option.response.selectUserCnt > max.response.selectUserCnt
      ? option
      : max;
  }, options[0]);

  return (
    <>
      <QuestionTitle>{label}</QuestionTitle>
      <div
        className={`${classes.optionsContainer} ${
          isPictrue ? classes.pictrueGrid : undefined
        }`}
      >
        {options.map((option, idx) => {
          const selectUser = option.response.selectUserCnt;
          const ixMax = maxOption === option;
          return (
            <div key={idx}>
              <div className={classes.questionLabel}>
                {ixMax ? (
                  <IconLabel Icon={Crown}>{option.label}</IconLabel>
                ) : (
                  option.label
                )}
                <span>{selectUser} 명</span>
              </div>

              {/* Percent */}
              <SurveyResultBar
                // triggerContents={[genderGroup, ageGroup]}
                curCnt={selectUser}
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
