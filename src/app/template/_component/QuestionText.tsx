import Image from "next/image";
import { useFormContext } from "react-hook-form";
import commonStyle from "@/styles/pages/template.module.scss";
import classes from "./QuestionText.module.scss";
import FormRegisterError from "@/components/Error/FormRegisterError";
import FormTextarea from "@/components/ui/FormElement/FormTextarea";

export default function QuestionText({
  description,
  qsImg,
  qsId,
}: {
  description: string;
  qsImg: string | null;
  qsId: number;
}) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const errorMsg = errors[`${qsId}`]?.message;

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
        </div>
      )}
      <FormTextarea
        className={classes.textArea}
        placeholder={`${description}을 기재해주세요!`}
        {...register(qsId + "", {
          required: "필수 항목입니다.",
        })}
        autoComplete="off"
      />

      {errorMsg && <FormRegisterError errorMsg={errorMsg as string} />}
    </>
  );
}
