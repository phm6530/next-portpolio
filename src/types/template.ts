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

export type CommentTemplateProps = {
  id: number;
  title: string;
  description: string;
  created_at: string;
  template: TemplateTypeProps;
  img?: string;
  template_key?: string;
  dateRange: [string, string] | [null, null];

  templateOption: {
    genderChk: IuputBoolean;
    ageChk: IuputBoolean;
  };
};

//Template Questions Type
export type GetQuestionMetaProps = {} & CommentTemplateProps;

//템플릿 Item 타입
export type GetTemplateItemProps = {
  user_cnt: number;
  age_group: string | null;
  gender_group: Gender | null;

  templateOption: {
    genderChk: IuputBoolean;
    ageChk: IuputBoolean;
  };
} & CommentTemplateProps;

//템플릿 리스트 타입
export type GetTemplateMetaLists = {
  result: GetTemplateDetail[];
  cnt: number;
};

//DAO
export type SelectTEmplateDetailProps = {
  start_date: string;
  end_date: string;
} & Omit<GetTemplateItemProps, "templateOption" | "dateRange">;

//템플릿 결과 디테일 타입
export type GetTemplateDetail = {} & Omit<
  GetTemplateItemProps,
  "templateOption"
>; // 일관성 유지
