import { ID_template, TemplateProps } from "@/types/templateSurvey";

export function getTemplateId(template: TemplateProps) {
  if (template === "survey") {
    return ID_template.Survey;
  } else if (template === "rank") {
    return ID_template.Rank;
  }
}
