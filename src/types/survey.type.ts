import {
  RespondentsAndMaxGroup,
  TemplateItemMetadata,
} from "@/types/template.type";

export enum QUESTION_TYPE {
  TEXT = "text",
  SELECT = "select",
}

// Base
export type BaseQuestionsType = {
  id: number;
  type: QUESTION_TYPE;
  label: string;
  required: boolean;
};

//설문조사 Detail Page Props
export type SurveyTemplateDetail = {
  questions: (SurveyQuestionsText | SurveyQuestionSelect)[];
} & TemplateItemMetadata<RespondentsAndMaxGroup>;

// 주관식
export type SurveyQuestionsText = {
  pictrue: null;
} & BaseQuestionsType;

// 객관식
export type SurveyQuestionSelect = {
  id: number;
  type: string;
  label: string;
  pictrue: null | string;
  required: boolean;
  multi_select: boolean;
  options: SurveyQuestionOption[];
};

// 객관식- 옵션
export type SurveyQuestionOption = {
  value: string;
  img: string | null;
  optionId: number[];
} & Omit<BaseQuestionsType, "label">;

/*제출시 */
export type AnswerSelect = {
  questionId: number;
  type: QUESTION_TYPE.SELECT;
  optionId: number[]; // useForm에서 직접 넣을거임
};

export type AnswerText = {
  questionId: number;
  type: QUESTION_TYPE.TEXT;

  answer?: string; // useForm에서 직접 넣을거임
};

export type AnswerSurvey = {
  gender?: ("male" | "female") | null;
  ageGroup?: number | null;
  answers: (AnswerText | AnswerSelect)[];
};
