import { TEMPLATE_TYPE, TemplateItemMetadata } from "@/types/template.type";

export enum QUESTION_TYPE {
  TEXT = "text",
  SELECT = "select",
}

// Base
export type BaseQuestionsType = {
  id: number;
  type: QUESTION_TYPE;
  label: string;
};

//설문조사 Detail Page Props
export type SurveyTemplateDetail = {
  questions: (SurveyQuestionsText | SurveyQuestionSelect)[];
} & TemplateItemMetadata;

// 주관식
export type SurveyQuestionsText = {
  pictrue: null;
} & BaseQuestionsType;

// 객관식- 옵션
export type SurveyQuestionOption = {
  value: string;
  optionPicture: string | null;
} & BaseQuestionsType;

// 객관식
export type SurveyQuestionSelect = {
  id: number;
  type: string;
  label: string;
  pictrue: null | string;
  options: SurveyQuestionOption[];
};

/*제출시 */
export type AnswerSelect = {
  questionId: number;
  type: QUESTION_TYPE.TEXT;
  optionId?: string; // useForm에서 직접 넣을거임
};

export type AnswerText = {
  questionId: number;
  type: QUESTION_TYPE.SELECT;
  answer?: string; // useForm에서 직접 넣을거임
};

export type AnswerSurvey = {
  gender?: ("male" | "female") | null;
  ageGroup?: number | null;
  answers: (AnswerText | AnswerSelect)[];
};
