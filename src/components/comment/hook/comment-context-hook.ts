import { useContext } from "react";
import { CommentEditorContext } from "../context/comment-context";

export default function useCommentContext() {
  const ctx = useContext(CommentEditorContext);
  return ctx;
}
