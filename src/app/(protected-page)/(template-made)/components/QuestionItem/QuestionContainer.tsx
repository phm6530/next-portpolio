import { ReactNode } from "react";
import useAOS from "@/_hook/usAOS";

export default function QuestionListWrapper({
  children,
}: {
  children: ReactNode;
}) {
  useAOS();
  return (
    <article
      className={`rounded-lg border border-muted p-4 shadow-md flex flex-col gap-6 aos-hidden`}
    >
      {children}
    </article>
  );
}
