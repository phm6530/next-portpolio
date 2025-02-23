"use client";
import { User, USER_ROLE } from "@/types/auth.type";
import { MSG_PARAM_PATH } from "@/types/comment.type";
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

type ContextType = {
  EDITOR_PATH: MSG_PARAM_PATH | null;
};

// inital
export const CommentEditorContext = createContext<ContextType>({
  EDITOR_PATH: null,
});

export function CommentEditorProvider({
  children,
  EDITOR_PATH,
}: {
  children: ReactNode;
} & ContextType) {
  return (
    <CommentEditorContext.Provider
      value={{
        EDITOR_PATH,
      }}
    >
      {children}
    </CommentEditorContext.Provider>
  );
}
