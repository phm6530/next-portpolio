// Union 정의
export type Gender = "female" | "male";
//현재는 text랑 select만 만들거임
export type SurveyType = {
  type: "text" | "select";
};

//Template Name
export type TemplateProps = "survey" | "rank";
export type IuputBoolean = "1" | "0";

export type TotalCntProps = { total_cnt: null | number };

export interface templateItemProps {
  id: number;
  title: string;
  description: string;
  created_at: string;
  template: TemplateProps;
  img?: string;

  templateOption: {
    genderChk: IuputBoolean;
    ageChk: IuputBoolean;
  };
}

export type templateMetaProps = {
  template: TemplateProps;
  imgKey: string;
};

export type GetTemplateLists = {
  result: GetTemplateDetail[];
  cnt: number;
};

export type PostAddsurveyDetailProps = {
  surveyId: number;
  gender: Gender;
  ageGroup: string;
} & {
  [key: string]: string;
};

export type GetTemplateDetail = {
  age_group: string;
  gender_group: Gender;
  user_cnt: number;
} & Omit<templateItemProps, "templateOption">;
