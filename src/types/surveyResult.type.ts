import { QUESTION_TYPE } from "@/types/survey.type";
import { DetailRespondents, TemplateItemMetadata } from "@/types/template.type";

type BaseResultItem = {
  id: number;
  label: string;
  picture: string | null;
};

//응답자
interface Respondent {
  id: number;
  age: number;
  gender: string;
}

export interface TextAnswer {
  id: number;
  answer: string;
  respondent: Respondent;
}

//주관식
export type ResultText = {
  type: QUESTION_TYPE.TEXT;
  textAnswers: TextAnswer[];
  isNextPage: number | null;
} & BaseResultItem;

//객관식
export type ResultSelect = {
  type: QUESTION_TYPE.SELECT;
  options: ResultSelectOption[];
} & BaseResultItem;

// 옵션 응답자
export type ResultSelectOption = {
  id: number;
  label: string;
  value: string;
  type: QUESTION_TYPE.SELECT;
  img: null | string;
  response: {
    selectUserCnt: number;
    female?: {
      [key: string]: number;
    };
    male?: { [key: string]: number };
  };
};

//survey 결과페이지
export type SurveyResult = {
  questions: (ResultText | ResultSelect)[];
} & TemplateItemMetadata<DetailRespondents>;
