"use client";
import { useFormContext, useFieldArray } from "react-hook-form";
import SurveyTypeSelect from "@/app/template/made/[templateType]/_component/Survey/SurveyTypeSelect";
import SurveyTypeText from "@/app/template/made/[templateType]/_component/Survey/SurveyTypeText";
import { RequestSurveyFormData } from "@/app/(template-made)/made/[...madeType]/components/survey/CreateSurvey";
import { QUESTION_TYPE } from "@/types/survey.type";
import classes from "./SurveyList.module.scss";

export default function SurveyList() {
  const {
    control,
    watch,
    formState: { errors },
  } = useFormContext<RequestSurveyFormData>();

  console.log("errors", errors);
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

  // //img Params
  // const params: surveyParams = useParams();
  // const [_, imgId] = params.templateType;

  return (
    <>
      <p>총 항목 : {questionsWatch.length}</p>
      <p>주관식 항목 : {cntType(QUESTION_TYPE.TEXT)}</p>
      <p>객관식 항목 : {cntType(QUESTION_TYPE.SELECT)}</p>

      <div className={classes.list}>
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
            //리스트 만들기 - Props으로 넘겨서 메모리 아끼기
            return (
              <div key={qsIdx}>
                <h1> Q.{qsIdx + 1} </h1>
                <SurveyTypeSelect
                  surveyDelete={remove}
                  surveyIdx={qsIdx}
                  // imgId={imgId}
                />
              </div>
            );
          }
        })}
        {questionsWatch.length === 0 && "하나이상의 질문을 생성해주세요."}
      </div>
    </>
  );
}
