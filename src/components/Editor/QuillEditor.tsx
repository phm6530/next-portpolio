"use client";

import {
  Controller,
  FieldValues,
  Path,
  useFormContext,
} from "react-hook-form";
import ReactQuill from "react-quill-new";
import "react-quill/dist/quill.snow.css";
import classes from "./QuillEditor.module.scss";
import FormRegisterError from "@/components/Error/FormRegisterError";
import { useEffect, useRef } from "react";

export default function QuillEditor<T extends FieldValues>({
  name,
}: {
  name: Path<T>;
}) {
  const {
    formState: { errors },
    control,
    setValue,
    trigger,
  } = useFormContext();

  const quillRef = useRef<any>(null);
  const isComposing = useRef(false);
  const contentCache = useRef<string>("");

  const err = name && errors ? errors[name] : null;

  useEffect(() => {
    const editor = quillRef.current?.getEditor();
    if (!editor) return;

    const editorRoot = editor.root;

    const handleCompositionStart = () => {
      isComposing.current = true;
    };

    const handleCompositionEnd = () => {
      isComposing.current = false;

      // 조합이 끝난 후의 내용을 가져옴
      const finalContent = editor.root.innerHTML;

      // 캐시된 내용과 다를 경우에만 업데이트
      if (contentCache.current !== finalContent) {
        contentCache.current = finalContent;
        setValue(name, finalContent, { shouldValidate: true });
        trigger(name);
      }
    };

    const handleInput = (event: InputEvent) => {
      if (!isComposing.current) {
        const currentContent = editor.root.innerHTML;
        if (contentCache.current !== currentContent) {
          contentCache.current = currentContent;
          setValue(name, currentContent, { shouldValidate: true });
          trigger(name);
        }
      }
    };

    editorRoot.addEventListener(
      "compositionstart",
      handleCompositionStart
    );
    editorRoot.addEventListener(
      "compositionend",
      handleCompositionEnd
    );
    editorRoot.addEventListener("input", handleInput);

    return () => {
      editorRoot.removeEventListener(
        "compositionstart",
        handleCompositionStart
      );
      editorRoot.removeEventListener(
        "compositionend",
        handleCompositionEnd
      );
      editorRoot.removeEventListener("input", handleInput);
    };
  }, [name, setValue, trigger]);

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
          render={({ field }) => (
            <ReactQuill
              ref={quillRef}
              theme="snow"
              value={field.value || ""}
              onChange={(content, delta, source, editor) => {
                if (!isComposing.current) {
                  const currentContent = editor.getHTML();
                  if (contentCache.current !== currentContent) {
                    contentCache.current = currentContent;
                    field.onChange(currentContent);
                  }
                }
              }}
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
