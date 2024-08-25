import { surveyParams } from "@/types/templateSurvey";
import { ReactNode } from "react";

export default function layOut({
  params,
  children,
}: {
  params: surveyParams;
  children: ReactNode;
}) {
  const template = params.templateType;

  return (
    <>
      <h1>{template} 템플릿</h1>
      {children}
    </>
  );
}
