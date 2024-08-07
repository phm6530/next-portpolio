import { AddSurveyFormProps, TemplateProps } from "@/types/survey";
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
