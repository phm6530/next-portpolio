import { userProps } from "./user";

// 성별 타입 정의
type Gender = "men" | "women";

//주요 참여자
export interface ParticipationMainProps {
  ageRange: number;
  gender: Gender;
}

//설문조사 Props
export interface SurveyItemProps {
  surveyId: number;
  img: string;
  surveyTitle: string;
  createUser: userProps;
  ParticipationMain: ParticipationMainProps;
  ParticipationCnt: number;
  item?: {
    hot?: boolean;
    ing?: boolean;
    event?: boolean;
  };
}

//현재는 text랑 select만 만들거임
export type SurveyType = {
  type: "text" | "select";
};

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
export interface AddSurveyFormProps {
  title: string;
  description: string;
  items: (SurveyText | SurveyRadioProps)[];
}
