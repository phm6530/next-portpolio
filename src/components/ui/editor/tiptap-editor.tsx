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
import React, { useState } from "react";
import Placeholder from "@tiptap/extension-placeholder";
import TipTapToolbar from "./tiptap-toolbar";
import { cn } from "@/lib/utils";
import SkeletonListItem from "@/components/shared/loading/skeleton-listitem";

const lowlight = createLowlight(all);
lowlight.register("html", html);
lowlight.register("css", css);
lowlight.register("js", js);
lowlight.register("ts", ts);

const TipTapEditor = ({
  mode = "editor",
  value,
  onChange,
  placeholder,
}: {
  content?: string;
  value?: string;
  onChange?: (_html: string) => void;
  placeholder?: string;
  mode?: "view" | "editor";
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(
    mode === "editor" && false
  );

  const editor = useEditor({
    extensions: [
      StarterKit, // 여기 이미 Heading + codeblock
      // Heading.configure({
      //   levels: [1, 2, 3],
      // }),
      // CodeBlockLowlight.configure({
      //   lowlight,
      // }),
      Youtube.configure({
        controls: false,
        nocookie: true,
      }),
      Placeholder.configure({ placeholder }),
    ],

    editorProps: {
      handleDOMEvents: {
        beforeinput: () => true,
      },
    },

    content: value || "",
    ...(onChange && {
      onUpdate: ({ editor }) => {
        const html = editor.getHTML();
        onChange(html === "<p></p>" ? "" : html);
      },
    }),
    ...(mode === "view" && {
      editable: false,
    }), //이거에 따라 바뀜 ㅇㅇ
    onCreate: () => {
      setIsLoading(false);
    },
    immediatelyRender: false,
  });

  if (!editor) return;

  const handleEditorClick = () => {
    if (mode === "editor") {
      editor.chain().focus().run();
    }
  };

  return (
    <div className="table border-collapse w-full rounded-lg overflow-hidden">
      {mode === "editor" && <TipTapToolbar editor={editor} />}
      <div className="table-cell border w-full cursor-text min-h-[100px] h-full">
        <EditorContent
          editor={editor}
          className={cn(
            " w-full h-full  p-3 min-h-[150PX]",
            mode === "editor" && "bg-custom-input"
          )}
          onClick={handleEditorClick}
        />
      </div>
    </div>
  );
};

export default TipTapEditor;
