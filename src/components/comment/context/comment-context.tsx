"use client";
import { User, USER_ROLE } from "@/types/auth.type";
import { createContext, ReactNode, useState, useEffect } from "react";

export type CommentReponse = {
  id: number;
  updateAt: string;
  createdAt: string;
  content: string;
  replies: CommentReponse[];
  user: User | null;
  anonymous: string | null;
  creator: {
    role: USER_ROLE;
    nickname: string;
  } & { email?: string };
};

export enum COMMENT_EDITOR_MODE {
  COMMENT = "comment",
  REPLY = "reply",
}

export enum COMMENT_NEED_PATH {
  TEMPLATE = "template",
  BOARD = "board",
}

type ContextType = {
  EDITOR_PATH: COMMENT_NEED_PATH | null;
  EDITOR_MODE: COMMENT_EDITOR_MODE | null;
};

// inital
export const CommentEditorContext = createContext<ContextType>({
  EDITOR_PATH: null,
  EDITOR_MODE: null,
});

export function CommentEditorProvider({
  children,
  EDITOR_PATH,
  EDITOR_MODE,
}: {
  children: ReactNode;
} & ContextType) {
  return (
    <CommentEditorContext.Provider
      value={{
        EDITOR_PATH,
        EDITOR_MODE,
      }}
    >
      {children}
    </CommentEditorContext.Provider>
  );
}
