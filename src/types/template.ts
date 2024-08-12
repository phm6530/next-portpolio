import { Gender } from "@/types/templateSurvey";

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

export type ResposetemplateDatas = {
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
  total_cnt: number;
} & Omit<templateItemProps, "templateOption">;
