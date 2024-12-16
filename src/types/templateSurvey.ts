import { InferObj } from "@/types/common";
import {
  Gender,
  IuputBoolean,
  SurveyType,
  GetTemplateItemProps,
  templateMetaProps,
  GetQuestionMetaProps,
} from "@/types/template";

export enum ID_template {
  Survey = 1,
  Rank = 2,
}

//page
export type surveyParams = {
  templateType: string;
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
  textImg?: string;
  options?: never; // 주관식은 필요없음
} & SurveyType;

//객관식 타입
export type SurveyOptionItemProps = {
  id: number;
  label: string;
  options: {
    idx: number;
    value: string;
    img?: string;
  }[];
} & SurveyType;

//설문조사 Default
export type AddSurveyFormProps = {
  title: string;
  description: string;
  thumbnail: string;
  genderChk: IuputBoolean;
  ageChk: IuputBoolean;
  items: (SurveyText | SurveyOptionItemProps)[];

  //기한
  dateRange: Date[] | null;

  access_email?: string;
  access_email_agreed?: boolean;
  access_pin?: number | null;
};

export type RequestSurveyFormProps = {
  dateRange: string[] | null;
} & Omit<AddSurveyFormProps, "dateRange"> &
  templateMetaProps;

// 객관식 option 타입
export type GetSurveyQuestions = {
  questions: {
    id: number;
    label: string;
    type: InferObj<SurveyType>;
    textImg: string | null;

    options?: {
      optionId: number;
      option_idx: number;
      label: string;
      value: string;
      optionPictrue: string | null;
    }[];
  }[];
};

//각 템플릿 문제 및 메타 데이터 타입
export type GetSurveyDetailProps = {} & GetSurveyQuestions &
  GetQuestionMetaProps;

//Survey Type Detila
export type AddsurveyDetailProps = {} & GetTemplateItemProps &
  GetSurveyQuestions;

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
