"use client";

import { COMMENT_NEED_PATH } from "@/types/comment.type";
import { createContext, ReactNode, useState, useEffect } from "react";

export const CommentEditorContext = createContext<{
  section: COMMENT_NEED_PATH | null;
  setSections: (e: COMMENT_NEED_PATH) => void;
}>({
  section: null,
  setSections: () => {},
});

/**
 * Editor 어디 Comment Provider로 전달
 */

export function CommentEditorProvider({
  children,
  initialSection = null, // 초기 섹션 값을 props로 받을 수 있게
}: {
  children: ReactNode;
  initialSection?: COMMENT_NEED_PATH | null;
}) {
  const [section, setSection] = useState<COMMENT_NEED_PATH | null>(
    initialSection
  );

  useEffect(() => {
    // Page 떠날떄 초기화 시켜부리기
    return () => {
      setSection(null);
    };
  }, []);

  return (
    <CommentEditorContext.Provider
      value={{
        section,
        setSections: setSection,
      }}
    >
      {children}
    </CommentEditorContext.Provider>
  );
}
