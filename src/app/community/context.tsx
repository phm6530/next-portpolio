"use client";

import { COMMENT_NEED_PATH } from "@/types/comment.type";
import { createContext, ReactNode, useState } from "react";

// Context 생성시 타입 적용
const CommentEditorContext = createContext<{
  section: COMMENT_NEED_PATH | null; //초기는 없고
}>({
  section: null,
});

export function CommentEditorProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [section, setSection] = useState<COMMENT_NEED_PATH | null>(
    null
  );

  return (
    <CommentEditorContext.Provider
      value={{
        section,
        setSection,
      }}
    >
      {children}
    </CommentEditorContext.Provider>
  );
}
