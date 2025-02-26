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
      className={`rounded-lg border-2 bg-card brightness-120 p-4 shadow-lg flex flex-col gap-6 aos-hidden`}
    >
      {children}
    </article>
  );
}
