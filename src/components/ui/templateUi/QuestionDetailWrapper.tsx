import { ReactNode } from "react";

export default function QuestionDetailWrapper({
  children,
}: {
  children: ReactNode;
}) {
  return <div className="border p-4">{children}</div>;
}
