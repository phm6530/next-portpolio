enum TemplateType {
  SURVEY = "survey",
  RANK = "rank",
}

//참여자
export type RespondentsProps = {
  allCnt: number;
  detail: {
    female: {
      [key: string]: number;
    };
    male: {
      [key: string]: number;
    };
  };
};

//Template List Props ...
export type TemplateItemMetadata = {
  id: number;
  updatedAt: string;
  createdAt: string;
  title: string;
  description: string;
  templateType: TemplateType;
  isGenderCollected: boolean;
  isAgeCollected: boolean;
  startDate: string | null;
  endDate: string | null;
  thumbnail: string;
  respondents: RespondentsProps;
};

export type TemplateDetilaPageResponse = {
  questions: any;
} & TemplateItemMetadata;
