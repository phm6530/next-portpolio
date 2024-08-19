import { InferObj } from "@/types/common";
import {
  Gender,
  IuputBoolean,
  SurveyType,
  templateItemProps,
} from "@/types/template";

export enum ID_template {
  Survey = 1,
  Rank = 2,
}

//page
export type surveyParams = {
  type: string;
};

//주요 참여자
export interface ParticipationMainProps {
  ageRange: number;
  gender: Gender;
}

//주관식 타입
export type SurveyText = {
  id: number;
  label: string;
  options?: never; // 주관식은 필요없음
} & SurveyType;

//객관식 타입
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
  genderChk: IuputBoolean;
  ageChk: IuputBoolean;
  items: (SurveyText | SurveyRadioProps)[];
  access_email: string;
  access_email_agreed: boolean;
};

//Survey Type Detila
export type AddsurveyDetailProps = {
  questions: {
    id: number;
    label: string;
    type: InferObj<SurveyType>;

    options?: {
      optionId: number;
      option_idx: number;
      label: string;
      value: string;
      optionPictrue: string | null;
    }[];
  }[];
} & templateItemProps;

// Survey Result
export interface ResultQuestion {
  id: number;
  question: string;
  total_participants?: number;
  type: string;

  options?: ResultOption[];
  values?: {
    gender: Gender;
    age: 10 | 20 | 30 | 40 | 50 | 60;
    value: string;
  }[];
}

export interface ResultOption {
  idx: number;
  label: string;
  picture: string | null;
  user: {
    female: {
      [key: string]: number;
    };
    male: {
      [key: string]: number;
    };
  };
}
