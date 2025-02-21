"use client";

import { Controller, FieldValues, Path, useFormContext } from "react-hook-form";
import ReactQuill from "react-quill-new";
import "react-quill/dist/quill.snow.css";
import { useEffect, useRef } from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../form";

export default function QuillEditor<T extends FieldValues>({
  name,
}: {
  name: Path<T>;
}) {
  const { control, setValue, trigger } = useFormContext();

  const quillRef = useRef<any>(null);
  const isComposing = useRef(false);
  const contentCache = useRef<string>("");

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

    editorRoot.addEventListener("compositionstart", handleCompositionStart);
    editorRoot.addEventListener("compositionend", handleCompositionEnd);
    editorRoot.addEventListener("input", handleInput);

    return () => {
      editorRoot.removeEventListener(
        "compositionstart",
        handleCompositionStart
      );
      editorRoot.removeEventListener("compositionend", handleCompositionEnd);
      editorRoot.removeEventListener("input", handleInput);
    };
  }, [name, setValue, trigger]);

  return (
    <>
      <FormField
        name={name}
        control={control}
        render={({ field }) => {
          return (
            <FormItem>
              <FormLabel>
                간단한 설명을 기재해주세요{" "}
                <span className="text-primary">*</span>
              </FormLabel>
              <FormControl>
                <ReactQuill
                  {...field}
                  onChange={(content, delta, source, editor) => {
                    if (!isComposing.current) {
                      const currentContent = editor.getHTML();
                      if (contentCache.current !== currentContent) {
                        contentCache.current = currentContent;
                        field.onChange(currentContent);
                        trigger(name);
                      }
                    }
                  }}
                  placeholder="내용을 입력해주세요"
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
              </FormControl>
              <FormMessage />
            </FormItem>
          );
        }}
      />
    </>
  );
}
