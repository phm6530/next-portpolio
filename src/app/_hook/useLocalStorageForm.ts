import { AddSurveyFormProps } from "@/types/templateSurvey";
import { TemplateProps } from "@/types/template";
import { useEffect, useState } from "react";

const useLocalStorageForm = (surveyType: TemplateProps, page: number) => {
  const [getValue, setGetValue] = useState<AddSurveyFormProps | null>(null);

  useEffect(() => {
    return () => {
      if (getValue !== null) {
        localStorage.setItem(`${surveyType}-${page}`, JSON.stringify(getValue));
      }
    };
  }, [surveyType, getValue, page]);

  return {
    setGetValue,
  };
};

export default useLocalStorageForm;
