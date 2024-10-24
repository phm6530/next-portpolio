import { ChangeEvent, ReactNode, useState } from "react";
import { useFormContext } from "react-hook-form";
import classes from "./CommentTextArea.module.scss";
import useRows from "@/_hook/useRows";

export default function CommentTextArea({
  name,
  children,
}: {
  name: string;
  children: ReactNode;
}) {
  const [rows, rowsHanlder] = useRows();
  const [textLength, setTextLength] = useState<string>("");
  const { register } = useFormContext();

  return (
    <>
      <textarea
        className={classes.textarea}
        rows={rows}
        {...register(name, {
          required: "남기실 말은 필수입니다.",
          onChange: (e: ChangeEvent<HTMLTextAreaElement>) => {
            rowsHanlder(e);
            setTextLength(e.currentTarget.value);
          },
          minLength: {
            value: 4,
            message: "최소 4글자 남겨주세요!",
          },
          maxLength: {
            value: 1000,
            message: "최대 1000자까지만 입력 가능합니다.",
          },
        })}
        placeholder="댓글을 입력해주세요! 욕설이나 비하 댓글을 삭제 될 수 있습니다. 타인에게 상처주는 말은 하지 말아주세요!"
      />
      {children}

      {/* 길이 */}
      <div
        className={`${classes.textLength} ${
          textLength.length > 1000 ? classes.errorColor : undefined
        }`}
      >
        {textLength.length} / 1000 자{" "}
      </div>
    </>
  );
}
