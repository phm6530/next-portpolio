"use client";

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
import LoadingWrapper from "@/components/shared/loading/loading-wrapper";

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

  if (!editor || isLoading) {
    return <LoadingWrapper />;
  }

  const handleEditorClick = () => {
    if (mode === "editor") {
      editor.chain().focus().run();
    }
  };

  return (
    <div className="table w-full rounded-md overflow-hidden   border-collapse ">
      {mode === "editor" && <TipTapToolbar editor={editor} />}
      <div
        className={cn(
          mode === "view" && "border-none",
          "table-cell w-full border-input border !rounded-lg cursor-text min-h-[100px]  h-full overflow-hidden rounded-b-md focus-within:border-primary focus-within:focus-within:bg-[hsl(var(--custom-color))]"
        )}
      >
        <EditorContent
          editor={editor}
          className={cn(
            " w-full h-full min-h-[150PX] overflow-hidden ",
            mode === "editor" && "bg-custom-input p-3"
          )}
          onClick={handleEditorClick}
        />
      </div>
    </div>
  );
};

export default TipTapEditor;
