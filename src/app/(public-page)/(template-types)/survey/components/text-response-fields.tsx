import Image from "next/image";
import { useFormContext, useWatch } from "react-hook-form";
import FormTextarea from "@/components/ui/FormElement/FormTextarea";
import { AnswerSurvey } from "@/types/survey.type";

export default function TextResponseField({ qsId }: { qsId: number }) {
  const { control } = useFormContext<AnswerSurvey>();

  const answers = useWatch({
    control,
    name: "answers",
  });

  // 해당 questionId의 인덱스 찾기
  const curIdx = answers.findIndex((e) => e.questionId === qsId);

  if (curIdx === -1 || curIdx === undefined) {
    return <p>해당 질문을 찾을 수 없습니다.</p>;
  }

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        <FormTextarea
          placeholder={` 답변을 기재해주세요!`}
          name={`answers.${curIdx}.answer`}
          autoComplete="off"
        />
      </div>
    </>
  );
}
