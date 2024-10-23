"use client";

import { FormProvider, useForm } from "react-hook-form";

type SurveyQuestion = {
  id: number;
  type: string;
  label: string;
  pictrue: null | string;
  options: any[];
};

export default function SurveyForm(questions: SurveyQuestion[]) {
  //   console.log(props);
  const formMethod = useForm();
  const {} = formMethod;

  return (
    <FormProvider {...formMethod}>
      {/* Gender Chk  */}
      {/* {Boolean(Number(templateOption.genderChk)) && <OptionGenderGroup />} */}

      {/* age Chk  */}
      {/* {Boolean(Number(templateOption.ageChk)) && <OptionAgeGroup />} */}
    </FormProvider>
  );
}
