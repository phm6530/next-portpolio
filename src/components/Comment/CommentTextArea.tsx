import { ChangeEvent, ReactNode, useState } from "react";
import { useFormContext } from "react-hook-form";
import classes from "./Msg.module.scss";

export default function CommentTextArea({ children }: { children: ReactNode }) {
  const [rows, setRows] = useState(4 + 1);
  const [textLength, setTextlength] = useState<number>(0);

  const { register } = useFormContext();

  //   const getByteLength = (text: string): number => {
  //     let byteLength = 0;
  //     for (let i = 0; i < text.length; i++) {
  //       const charCode = text.charCodeAt(i);
  //       if (charCode <= 0x007f) {
  //         byteLength += 1; // 영문(ASCII)
  //       } else if (charCode <= 0x07ff) {
  //         byteLength += 2; // 한글(UTF-8에서 2바이트)
  //       } else {
  //         byteLength += 3; // 나머지(한글 등 UTF-8에서 3바이트)
  //       }
  //     }
  //     return byteLength;
  //   };

  //rows 커스텀
  const rowsHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.currentTarget.value;
    const newLineCount = value.split("\n").length;
    newLineCount > 4 ? setRows(newLineCount) : setRows(4);
    setTextlength(value.length);
  };

  return (
    <>
      <textarea
        rows={rows}
        {...register("msg", {
          required: "남기실 말은 필수입니다.",
          onChange: rowsHandler,
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
      <div
        className={`${classes.textLength} ${
          textLength > 1000 && classes.errorColor
        }`}
      >
        {textLength} / 1000 자{" "}
      </div>
    </>
  );
}
