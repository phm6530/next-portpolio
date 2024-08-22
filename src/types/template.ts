// Union 정의
export type Gender = "female" | "male";
//현재는 text랑 select만 만들거임
export type SurveyType = {
  type: "text" | "select";
};

//Template Name
export type TemplateTypeProps = "survey" | "rank";
export type IuputBoolean = "1" | "0";

export type TotalCntProps = { total_cnt: null | number };

export type templateMetaProps = {
  template: TemplateTypeProps;
  template_key: string;
};

export type PostAddsurveyDetailProps = {
  surveyId: number;
  gender: Gender;
  ageGroup: string;
} & {
  [key: string]: string;
};

//결과임
export interface templateItemProps {
  id: number;
  title: string;
  description: string;
  created_at: string;
  template: TemplateTypeProps;
  img?: string;
  template_key: string;
  dateRange: string[] | null[];
  user_cnt: number;
  age_group: string | null;
  gender_group: Gender | null;

  templateOption: {
    genderChk: IuputBoolean;
    ageChk: IuputBoolean;
  };
}

//DB에서 가져옴 ok
export type SelectTEmplateDetailProps = {
  start_date: string;
  end_date: string;
} & Omit<templateItemProps, "templateOption" | "dateRange">;

//결과
export type GetTemplateDetail = {} & Omit<templateItemProps, "templateOption">; // 일관성 유지

//가공전
export type GetTemplateMetaLists = {
  result: GetTemplateDetail[];
  cnt: number;
};
