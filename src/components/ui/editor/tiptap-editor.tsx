"use client";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import Heading from "@tiptap/extension-heading";
import { Editor, EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Youtube from "@tiptap/extension-youtube";
import { Code, Code2, Heading1, Heading2, Heading3 } from "lucide-react";
import { all, createLowlight } from "lowlight";
import css from "highlight.js/lib/languages/css";
import js from "highlight.js/lib/languages/javascript";
import ts from "highlight.js/lib/languages/typescript";
import html from "highlight.js/lib/languages/xml";
import React from "react";
import Placeholder from "@tiptap/extension-placeholder";

import YoutubeIcon from "/public/asset/icon/youtube.svg";
import { ControllerRenderProps } from "react-hook-form";

const lowlight = createLowlight(all);
lowlight.register("html", html);
lowlight.register("css", css);
lowlight.register("js", js);
lowlight.register("ts", ts);

const TipTapEditor = ({
  value,
  onChange,
  placeholder,
}: ControllerRenderProps & { placeholder: string }) => {
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
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      onChange(html === "<p></p>" ? "" : html);
    },
  });

  if (!editor) return;
  const handleEditorClick = () => {
    editor.chain().focus().run(); // 클릭 시 포커싱
  };

  const addYoutubeVideo = () => {
    const url = prompt("삽입하실 Youtube Url을 입력해주세요");

    if (url) {
      editor.commands.setYoutubeVideo({
        src: url,
      });
    }
  };

  return (
    <div className="table border-collapse w-full">
      <div className="table-row">
        <div className=" border button-group">
          <div className="table-cell">
            <button
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 1 }).run()
              }
              className={
                editor.isActive("heading", { level: 1 }) ? "is-active" : ""
              }
            >
              <Heading1 />
            </button>
            <button
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 2 }).run()
              }
              className={
                editor.isActive("heading", { level: 2 }) ? "is-active" : ""
              }
            >
              <Heading2 />
            </button>
            <button
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 3 }).run()
              }
              className={
                editor.isActive("heading", { level: 3 }) ? "is-active" : ""
              }
            >
              <Heading3 />
            </button>
          </div>
          <div className="table-cell ">
            <button
              onClick={() => editor.chain().focus().toggleCodeBlock().run()}
              className={editor.isActive("codeBlock") ? "is-active" : ""}
            >
              <Code2 />
            </button>
          </div>
          <div className="table-cell">
            <div className="button-group">
              <button id="add" onClick={addYoutubeVideo}>
                <div className="w-10 h-10 [&>svg]:w-10 [&>svg]:h-10 dark:[&>svg]:fill-[#ffffff] [&>svg]:fill-[#000] ">
                  <YoutubeIcon />
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>

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
