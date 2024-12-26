import { User } from "@/types/auth.type";
import { GENDER_GROUP } from "@/types/user";
import { ageGroupProps } from "./template";

export enum TEMPLATE_TYPE {
  SURVEY = "survey",
  RANK = "rank",
}

export enum TEMPLATERLIST_SORT {
  ALL = "all",
  MALE = "male",
  FEMALE = "female",
  RESPONDENTS = "respondents",
}

export enum RESPONDENT_TAG {
  DETAIL = "detail",
  MAXGROUP = "maxGroup",
}

//참여자 + 참여자 그룹 별 명수
export type DetailRespondents = {
  tag: RESPONDENT_TAG.DETAIL;
  allCnt: number;
  detail: {
    [key in GENDER_GROUP]: {
      [key in ageGroupProps]: number;
    };
  };
};

// MaxGroup + 참여자
export type RespondentsAndMaxGroup = {
  tag: RESPONDENT_TAG.MAXGROUP;
  allCnt: number;
  participants: {
    male: number;
    female: number;
  };
  maxGroup: {
    maxCnt: number;
    genderGroup?: GENDER_GROUP;
    ageGroup?: number;
  };
};

//응답자
export interface Respondent {
  id: number;
  age: number;
  gender: string;
}

//Template List Props ...
export type TemplateItemMetadata<
  T extends DetailRespondents | RespondentsAndMaxGroup
> = {
  id: number;
  // updatedAt: string;
  createdAt: string;
  title: string;
  description: string;
  templateType: TEMPLATE_TYPE;
  isGenderCollected: boolean;
  isAgeCollected: boolean;
  startDate: string | null;
  endDate: string | null;
  thumbnail: string;
  respondents: T;
  creator: User;
  templateKey: string;
};

export type FetchTemplateForm = {
  questions: any;
} & TemplateItemMetadata<RespondentsAndMaxGroup>;
