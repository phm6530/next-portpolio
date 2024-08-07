import { surveyParams, TemplateProps } from "@/types/survey";
import { ReactNode } from "react";

export default function layOut({
  params,
  children,
}: {
  params: surveyParams;
  children: ReactNode;
}) {
  const template = params.template;

  return (
    <>
      <h1>{template} 템플릿</h1>
      {children}
    </>
  );
}
