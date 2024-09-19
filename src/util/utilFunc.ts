import { TemplateTypeProps } from "@/types/template";
import { ID_template } from "@/types/templateSurvey";

export function getTemplateId(template: TemplateTypeProps) {
  if (template === "survey") {
    return ID_template.Survey;
  } else if (template === "rank") {
    return ID_template.Rank;
  }
}
