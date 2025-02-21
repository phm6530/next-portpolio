"use client";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import Heading from "@tiptap/extension-heading";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Youtube from "@tiptap/extension-youtube";

import { all, createLowlight } from "lowlight";
import css from "highlight.js/lib/languages/css";
import js from "highlight.js/lib/languages/javascript";
import ts from "highlight.js/lib/languages/typescript";
import html from "highlight.js/lib/languages/xml";
import React from "react";
import Placeholder from "@tiptap/extension-placeholder";
import TipTapToolbar from "./tiptap-toolbar";

const lowlight = createLowlight(all);
lowlight.register("html", html);
lowlight.register("css", css);
lowlight.register("js", js);
lowlight.register("ts", ts);

const TipTapEditor = ({
  mode = "editor",
  content,
  value,
  onChange,
  placeholder,
}: {
  content?: string;
  value?: string;
  onChange?: (html: string) => void;
  placeholder?: string;
  mode?: "view" | "editor";
}) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Heading.configure({
        levels: [1, 2, 3],
      }),
      CodeBlockLowlight.configure({
        lowlight,
      }),
      Youtube.configure({
        controls: false,
        nocookie: true,
      }),
      Placeholder.configure({ placeholder }),
    ],

    content: value || "",
    ...(onChange && {
      onUpdate: ({ editor }) => {
        const html = editor.getHTML();
        onChange(html === "<p></p>" ? "" : html);
      },
    }),
    ...(mode === "view" && { editable: false }), //이거에 따라 바뀜 ㅇㅇ
  });

  if (!editor) return;
  const handleEditorClick = () => {
    editor.chain().focus().run(); // 클릭 시 포커싱
  };

  return (
    <div className="table border-collapse w-full">
      {mode === "editor" && <TipTapToolbar editor={editor} />}

      <div className="table-cell border w-full cursor-text p-2 min-h-[100px] h-full">
        <EditorContent
          editor={editor}
          className="w-full h-full"
          onClick={handleEditorClick}
        />
      </div>
    </div>
  );
};

export default TipTapEditor;
