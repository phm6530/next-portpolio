"use client";
import { useFormContext, useFieldArray } from "react-hook-form";
import { SurveyPayload } from "@/app/(protected-page)/(template-made)/made/[...madeType]/survey/CreateSurvey";
import { QUESTION_TYPE } from "@/types/survey.type";
import { FormMessage } from "@/components/ui/form";
import CreateSurveySelect from "./create-survey-select";
import CreateSurveyText from "./create-survey-text";
import { DragEvent, useCallback, useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export default function CreateSurveyList() {
  const [dragTargetIdx, setDragTargetIdx] = useState<number | null>(null);
  const [curOverIdx, setCurOverIdx] = useState<number | null>(null);

  const {
    control,
    watch,
    formState: { errors },
    setError,
  } = useFormContext<SurveyPayload<"res">>();

  const { remove, move } = useFieldArray({
    control,
    name: "questions",
  });

  //Get보단 watch가 성능이 좋다 ,.
  const questionsWatch = watch("questions");

  //에러 수동 처리..
  useEffect(() => {
    if (questionsWatch.length > 0) {
      setError("questions", { message: "" });
    }
  }, [questionsWatch, setError]); //

  const onDragStart = useCallback(
    (qsIdx: number) => {
      setDragTargetIdx(qsIdx);
    },
    [] // 의존성 없음 유지
  );

  const onDragOver = useCallback(
    (e: DragEvent<HTMLDivElement>, qsIdx: number) => {
      e.preventDefault();
      setCurOverIdx(qsIdx);
    },
    []
  );

  // 드롭 시 처리
  const onDrop = useCallback(
    (e: DragEvent<HTMLDivElement>, qsIdx: number) => {
      e.preventDefault();
      if (dragTargetIdx !== null && dragTargetIdx !== qsIdx) {
        move(dragTargetIdx, qsIdx);
      }
      setDragTargetIdx(null);
      setCurOverIdx(null);
    },
    [dragTargetIdx, move]
  );

  // 드래그 종료시 상태 초기화
  const onDragEnd = useCallback(() => {
    setDragTargetIdx(null);
    setCurOverIdx(null);
  }, []);

  return (
    <>
      {/* List */}
      <div className="flex flex-col gap-10 rounded-sm">
        {questionsWatch.map((field, qsIdx) => {
          return (
            <div
              className={cn(
                "py-2 rounded-md md:p-2 cursor-grab",
                qsIdx === curOverIdx && "bg-primary"
              )}
              key={`${field.id}-${qsIdx}`}
              draggable
              onDragStart={() => onDragStart(qsIdx)}
              onDragOver={(e) => onDragOver(e, qsIdx)}
              onDrop={(e) => onDrop(e, qsIdx)}
              onDragEnd={onDragEnd}
            >
              {field.type === QUESTION_TYPE.TEXT ? (
                <CreateSurveyText surveyIdx={qsIdx} remove={remove} />
              ) : field.type === QUESTION_TYPE.SELECT ? (
                <CreateSurveySelect surveyDelete={remove} surveyIdx={qsIdx} />
              ) : null}
            </div>
          );
        })}
        {<FormMessage>{errors.questions?.root?.message}</FormMessage>}
      </div>
    </>
  );
}
