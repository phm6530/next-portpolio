import Grid from "@/components/ui/Grid";
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
    <Grid.center>
      <h1>{template} 템플릿</h1>
      {children}
    </Grid.center>
  );
}
