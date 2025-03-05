import { RequestSurveyFormData } from "@/app/(protected-page)/(template-made)/made/[...madeType]/survey/CreateSurvey";
import SurveyOptionItem from "./select-option-item";

import { QUESTION_TYPE } from "@/types/survey.type";

import {
  useFieldArray,
  UseFieldArrayRemove,
  useFormContext,
} from "react-hook-form";
import QuestionListWrapper from "@/app/(protected-page)/(template-made)/components/QuestionItem/QuestionContainer";
import { FormField, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import OptionsController from "./option-controller";
import ConfirmButton from "@/components/ui/confirm-button";

export default function CreateSurveySelect({
  surveyDelete,
  surveyIdx,
}: {
  surveyDelete: UseFieldArrayRemove;
  surveyIdx: number;
}) {
  //FormContext
  const { control, watch } = useFormContext<RequestSurveyFormData>();

  //항목 컨트롤러
  const {
    fields,
    append,
    remove: itemRemove,
  } = useFieldArray({
    control,
    name: `questions.${surveyIdx}.options`,
  });

  const handleArrAppend = () => {
    append({
      value: "",
      type: QUESTION_TYPE.SELECT,
    });
  };

  const optionWatch = watch(`questions.${surveyIdx}.options`);
  const isPicture = optionWatch.some((e) => e.img);

  return (
    <QuestionListWrapper>
      <div>
        <FormField
          name={`questions.${surveyIdx}.label`}
          control={control}
          render={({ field }) => {
            return (
              <>
                <div className="flex items-center">
                  <Input
                    {...field}
                    placeholder={`${surveyIdx + 1}. 질문을 입력해주세요`}
                    className="border-transparent !bg-transparent text-base placeholder:text-base md:text-lg md:placeholder:text-lg focus:border-transparent hover:border-transparent border-b "
                    autoComplete="off"
                  />
                  {/* <ConfirmDialog></ConfirmDialog> */}
                  <ConfirmButton
                    title="질문을 삭제하시겠습니까?"
                    cb={() => {
                      surveyDelete(surveyIdx);
                    }}
                  >
                    <Button variant={"ghost"}>삭제</Button>
                  </ConfirmButton>
                </div>
                <FormMessage />
              </>
            );
          }}
        />

        {/* 제목에러 */}
      </div>
      {/* Option에 img가 있다면 grid 변경하기 */}
      <div
        className={cn(
          "flex flex-col gap-5 my-2",
          isPicture && "grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))]"
        )}
      >
        {/* Radio - List */}
        {fields!.map((_, optionIdx) => {
          return (
            <SurveyOptionItem
              key={`${surveyIdx}-option-${optionIdx}`}
              surveyIdx={surveyIdx}
              optionIdx={optionIdx}
              itemRemove={itemRemove}
            />
          );
        })}
      </div>

      {/* 옵션 컨트롤러*/}

      <Button
        variant={"outline"}
        onClick={handleArrAppend}
        className="!text-sm"
      >
        <span>+</span> 항목추가{" "}
      </Button>
      <OptionsController name={`questions.${surveyIdx}`} multiSelect={true} />
    </QuestionListWrapper>
  );
}
