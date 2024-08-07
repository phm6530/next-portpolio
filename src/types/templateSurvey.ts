import { templateItemProps } from "@/types/template";
import { userProps } from "./user";
//page
export type surveyParams = {
  type: string;
};

export enum ID_template {
  Survey = 1,
  Rank = 2,
}

// Union 정의
type Gender = "men" | "women";

//현재는 text랑 select만 만들거임
export type SurveyType = {
  type: "text" | "select";
};

//주요 참여자
export interface ParticipationMainProps {
  ageRange: number;
  gender: Gender;
}

//주관식
export type SurveyText = {
  id: number;
  label: string;
  options?: never; // 주관식은 필요없음
} & SurveyType;

//객관식
export type SurveyRadioProps = {
  id: number;
  label: string;
  options?: {
    idx: number;
    value: string;
    img?: string;
  }[];
} & SurveyType;

//설문조사 Default
export type AddSurveyFormProps = {
  title: string;
  description: string;
  items: (SurveyText | SurveyRadioProps)[];
};

export type surveyDetailProps = {} & templateItemProps;
