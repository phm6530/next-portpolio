import { AddSurveyFormProps } from "@/types/survey";
import { useEffect, useState } from "react";

type TemplateProps = "default" | "rank";

const useLocalStorageForm = (surveyType: TemplateProps, page: number) => {
  const [getValue, setGetValue] = useState<AddSurveyFormProps | null>(null);

  useEffect(() => {
    return () => {
      if (getValue !== null) {
        localStorage.setItem(`${surveyType}-${page}`, JSON.stringify(getValue));
      }
    };
  }, []);

  return {
    setGetValue,
  };
};

export default useLocalStorageForm;
