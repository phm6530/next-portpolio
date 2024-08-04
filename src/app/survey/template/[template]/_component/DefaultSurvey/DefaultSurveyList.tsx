"use client";
import { useFormContext, useFieldArray, FieldErrors } from "react-hook-form";
import { AddSurveyFormProps, SurveyType } from "@/types/survey";
import DefaultTypeRadio from "@/app/survey/template/[template]/_component/DefaultSurvey/DefaultTypeRadio";

export default function DefaultSurveyList() {
  const {
    control,
    getValues,
    setValue,
    register,
    trigger,
    formState: { errors },
  } = useFormContext<AddSurveyFormProps>();

  const { remove } = useFieldArray({
    control,
    name: "items",
  });

  // get List
  const surveyList = getValues("items");

  //갯수
  const cntType = (type: SurveyType["type"]) => {
    return surveyList.filter((item) => item.type === type).length;
  };

  const validateNumber = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value = parseInt(e.target.value, 10);
    if (value < 2 || value > 20) {
      alert("값은 2 이상 20 이하여야 합니다.");

      //초기화
      e.target.value = "";
      return;
    }
  };

  return (
    <>
      <p>총 항목 : {surveyList.length}</p>
      <p>TEXT 항목 : {cntType("text")}</p>
      <p>선택 항목 : {cntType("select")}</p>

      {surveyList.map((field, surveyIdx) => {
        if (field.type === "text") {
          return (
            <div key={surveyIdx}>
              <h1> Q.{surveyIdx + 1}</h1>
              <input
                type="text"
                {...register(`items.${surveyIdx}.label`, {
                  required: "질문 제목은 필수항목 입니다.",
                })}
              />
              {/* delete */}
              <button type="button" onClick={() => remove(surveyIdx)}>
                삭제
              </button>
              <div>
                {errors.items?.[surveyIdx]?.label?.message as string | null}
              </div>
            </div>
          );
        } else if (field.type === "select") {
          //리스트 만들기
          const addOptions = (idx: number, cnt: number) => {
            const newOption = [...Array(cnt)].map((_, idx) => {
              return {
                idx,
                value: "",
              };
            });

            const curOptions = getValues(`items.${idx}.options`) || [];
            setValue(`items.${idx}.options`, [...curOptions, ...newOption]);
            trigger(`items.${idx}.options`); //트리거
          };

          return (
            <div key={surveyIdx}>
              <h1> Q.{surveyIdx + 1}</h1>

              <input
                type="text"
                autoComplete="off"
                {...register(`items.${surveyIdx}.label`, {
                  required: "질문 제목은 필수항목 입니다.",
                })}
              />
              {/* 제목에러 */}
              <div>
                {errors.items?.[surveyIdx]?.label?.message as string | null}
              </div>

              <div>
                {field.options?.length === 0 && (
                  <>
                    추가할 list
                    <input
                      type="number"
                      placeholder="최대 20개"
                      min={2}
                      max={20}
                      onChange={validateNumber}
                    />
                  </>
                )}

                <button type="button" onClick={() => addOptions(surveyIdx, 5)}>
                  Add
                </button>
              </div>

              {/* Radio - List */}
              {field.options!.map((_, optionIdx) => {
                return (
                  <div key={`option-${optionIdx}`}>
                    <DefaultTypeRadio
                      surveyIdx={surveyIdx}
                      optionIdx={optionIdx}
                    />
                  </div>
                );
              })}

              <button type="button" onClick={() => remove(surveyIdx)}>
                삭제
              </button>

              {/* 라디오 에러 */}
              <div>
                {errors.items?.[surveyIdx]?.options?.message as string | null}
              </div>
            </div>
          );
        }
      })}
    </>
  );
}
