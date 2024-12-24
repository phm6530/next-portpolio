"use client";

import { Control, Controller, useFormContext } from "react-hook-form";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import classes from "./QuillEditor.module.scss";
import FormRegisterError from "@/components/Error/FormRegisterError";
import { WriteBoardProps } from "./BoardForm";

export default function QuillEditor({
  control,
  name,
}: {
  control: Control<WriteBoardProps, any>;
  name: string;
}) {
  const {
    formState: { errors },
  } = useFormContext();

  const err = name && errors ? errors[name] : null;

  console.log(err);

  return (
    <>
      <div
        className={`${classes.editorContainer} ${
          err?.message ? classes.error : undefined
        }`}
      >
        <Controller
          name={name as "contents"}
          control={control}
          defaultValue="" // 초기 값 설정
          render={({ field }) => (
            <ReactQuill
              theme="snow"
              value={field.value}
              onChange={field.onChange}
              placeholder="내용을 입력해주세요"
              className={classes.custumQuillEditor}
              modules={{
                toolbar: [
                  [{ header: [1, 2, false] }],
                  ["bold", "italic", "underline"],
                  ["blockquote", "code-block"],
                  [{ list: "ordered" }, { list: "bullet" }],
                  ["link"],
                ],
              }}
              formats={[
                "header",
                "bold",
                "italic",
                "underline",
                "blockquote",
                "code-block",
                "list",
                "bullet",
                "link",
                "image",
              ]}
            />
          )}
        />
      </div>
      {err && <FormRegisterError errorMsg={err.message as string} />}
    </>
  );
}
