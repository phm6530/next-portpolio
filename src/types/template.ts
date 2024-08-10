//Template Name
export type TemplateProps = "survey" | "rank";
export type IuputBoolean = "1" | "0";

export interface templateItemProps {
  id: number;
  title: string;
  description: string;
  created_at: string;
  template: TemplateProps;
  img?: string;
}

export type templateMetaProps = {
  template: TemplateProps;
  imgKey: string;
};

export type ResposetemplateDatas = {
  result: templateItemProps[];
  cnt: number;
};
