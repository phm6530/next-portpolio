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
