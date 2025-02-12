"use client";
import { useFormContext, useFieldArray } from "react-hook-form";
import SurveyTypeSelect from "@/app/template/made/[templateType]/_component/Survey/SurveyTypeSelect";
import SurveyTypeText from "@/app/template/made/[templateType]/_component/Survey/SurveyTypeText";
import { RequestSurveyFormData } from "@/app/(protected-page)/(template-made)/made/[...madeType]/components/survey/CreateSurvey";
import { QUESTION_TYPE } from "@/types/survey.type";
import classes from "./SurveyList.module.scss";
import FormRegisterError from "@/components/Error/FormRegisterError";
import QuestionListWrapper from "@/app/(protected-page)/(template-made)/components/QuestionItem/QuestionContainer";

export default function SurveyList() {
  const {
    control,
    watch,
    formState: { errors },
  } = useFormContext<RequestSurveyFormData>();

  const { remove } = useFieldArray({
    control,
    name: "questions",
  });

  //Get보단 watch가 성능이 좋다 ,.
  const questionsWatch = watch("questions");

  //갯수
  const cntType = (type: QUESTION_TYPE) => {
    return questionsWatch.filter((item) => item.type === type).length;
  };

  return (
    <div>
      <div className={classes.questionsStatus}>
        <div>
          총 항목{" "}
          <span className={classes.QuestionsCnt}>{questionsWatch.length}</span>
          개
        </div>

        <div>
          주관식 항목 <span>{cntType(QUESTION_TYPE.TEXT)}</span>개
        </div>

        <div>
          객관식 항목 <span>{cntType(QUESTION_TYPE.SELECT)}</span>개
        </div>
      </div>

      <div className={classes.createQuestionsList}>
        {questionsWatch.map((field, qsIdx) => {
          if (field.type === QUESTION_TYPE.TEXT) {
            return (
              <SurveyTypeText
                key={`typeText-${qsIdx}`}
                surveyIdx={qsIdx}
                remove={remove}
              />
            );
          } else if (field.type === QUESTION_TYPE.SELECT) {
            //리스트 만들기 - Props으로..
            return (
              <SurveyTypeSelect
                key={`typeSelect-${qsIdx}`}
                surveyDelete={remove}
                surveyIdx={qsIdx}
                // imgId={imgId}
              />
            );
          }
        })}

        {errors["questions"]?.root?.message && (
          <QuestionListWrapper>
            <FormRegisterError errorMsg={errors["questions"]?.root?.message} />
          </QuestionListWrapper>
        )}

        {/* {questionsWatch.length === 0 && "하나이상의 질문을 생성해주세요."} */}
      </div>
    </div>
  );
}
