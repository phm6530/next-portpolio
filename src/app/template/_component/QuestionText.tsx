import Image from "next/image";
import { useFormContext, useWatch } from "react-hook-form";
import commonStyle from "@/styles/pages/template.module.scss";

import FormTextarea from "@/components/ui/FormElement/FormTextarea";
// import ImageZoom from "@/app/template/_component/ImageZoom";
import { AnswerSurvey } from "@/types/survey.type";

export default function QuestionText({
  description,
  qsImg,
  qsId,
}: {
  description: string;
  qsImg: string | null;
  qsId: number;
}) {
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
      {qsImg && (
        <div className={commonStyle.previewContainer}>
          <Image
            src={qsImg}
            layout="responsive"
            width={16}
            height={9}
            style={{ maxWidth: 700, objectFit: "cover" }}
            alt="preview"
            priority
          />
          {/* <ImageZoom alt={"preview"} image={qsImg} /> */}
        </div>
      )}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        <FormTextarea
          label={description}
          placeholder={`"${description}"에 대한 답변을 기재해주세요!`}
          name={`answers.${curIdx}.answer`}
          autoComplete="off"
        />
      </div>
    </>
  );
}
