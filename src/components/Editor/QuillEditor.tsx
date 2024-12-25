"use client";

import {
  Control,
  Controller,
  FieldValues,
  Path,
  PathValue,
  useFormContext,
} from "react-hook-form";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import classes from "./QuillEditor.module.scss";
import FormRegisterError from "@/components/Error/FormRegisterError";

export default function QuillEditor<T extends FieldValues>({
  control,
  name,
}: {
  control: Control<T, any>;
  name: Path<T>;
}) {
  const {
    formState: { errors },
  } = useFormContext();

  const err = name && errors ? errors[name] : null;

  return (
    <>
      <div
        className={`${classes.editorContainer} ${
          err?.message ? classes.error : undefined
        }`}
      >
        <Controller
          name={name}
          control={control}
          defaultValue={"" as PathValue<T, Path<T>>}
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
