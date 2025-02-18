import QuestionsContainer from "@/app/template/_component/survey/QuestionsContainer";
import { RequestSurveyFormData } from "@/app/(protected-page)/(template-made)/made/[...madeType]/survey/CreateSurvey";
import SurveyOptionItem from "@/app/template/made/[templateType]/_component/Survey/SurveyOptionItem";

import { QUESTION_TYPE } from "@/types/survey.type";

import {
  useFieldArray,
  UseFieldArrayRemove,
  useFormContext,
} from "react-hook-form";
import classes from "./SurveyTypeSelect.module.scss";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Info } from "lucide-react";
import QuestionItemHeader, {
  QuestionType,
} from "@/app/(protected-page)/(template-made)/components/QuestionItem/QuestionItemHeader";
import QuestionListWrapper from "@/app/(protected-page)/(template-made)/components/QuestionItem/QuestionContainer";
import { FormField, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import SvginButton from "@/components/ui/button-svg";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function SurveyTypeSelect({
  surveyDelete,
  surveyIdx,
}: {
  surveyDelete: UseFieldArrayRemove;
  surveyIdx: number;
}) {
  //FormContext
  const { control, watch, register } = useFormContext<RequestSurveyFormData>();

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
      label: "",
      value: "",
      type: QUESTION_TYPE.SELECT,
    });
  };

  const confimDelete = () => {
    if (confirm(`${surveyIdx + 1}번 문항을 삭제하시겠습니까?`)) {
      surveyDelete(surveyIdx);
    }
  };

  const optionWatch = watch(`questions.${surveyIdx}.options`);
  const isPicture = optionWatch.some((e) => e.img);
  const values = optionWatch
    .map((e) => e.value.trim())
    .filter((value) => value !== ""); // 빈 문자열 필터링

  const hasDuplicates = new Set(values).size !== values.length;

  // const optionError =
  //   errors.questions as FieldErrorsImpl<RequestSelect>[];

  return (
    <QuestionListWrapper>
      <div>
        <FormField
          name={`questions.${surveyIdx}.label`}
          control={control}
          render={({ field }) => {
            return (
              <>
                <div className="flex">
                  <Input
                    {...field}
                    placeholder={`${surveyIdx + 1}. 질문을 입력해주세요`}
                    className="border-transparent !bg-transparent text-lg placeholder:text-lg focus:border-transparent hover:border-transparent"
                    autoComplete="off"
                  />

                  <Button variant={"ghost"} onClick={() => confimDelete()}>
                    삭제
                  </Button>
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

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="items-top flex space-x-2">
              <Checkbox id="terms1" />
              <div className="grid gap-1.5 leading-none">
                <label
                  htmlFor="terms1"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer text-muted-foreground"
                >
                  복수 선택 여부
                </label>
              </div>
            </div>
          </TooltipTrigger>
          <TooltipContent
            align="start"
            sideOffset={20}
            className="flex flex-row gap-2 items-center"
          >
            <Info className="h-4 w-4" />
            <p className="text-xs">
              체크 시, 다중 응답이 가능하도록 변경합니다.
            </p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      {/* 복수 선택여부 */}

      <button
        className={"mt-3 flex gap-2 rounded-md text-[#576e8b] text-sm"}
        type="button"
        onClick={handleArrAppend}
      >
        <span>+</span> 항목추가
      </button>
      {/* Radio 전체삭제  */}
    </QuestionListWrapper>
  );
}
