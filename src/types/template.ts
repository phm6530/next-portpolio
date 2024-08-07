//Template Name
export type TemplateProps = "survey" | "rank";

export interface templateItemProps {
  id: number;
  title: string;
  description: string;
  created_at: string;
  template: TemplateProps;
  img?: string;
  // createUser: userProps;
  // ParticipationMain?: ParticipationMainProps;
  // ParticipationCnt?: number;
  // item?: {
  //   hot?: boolean;
  //   ing?: boolean;
  //   event?: boolean;
  // };
}

export type templateMetaProps = {
  template: TemplateProps;
  imgKey: string;
};
