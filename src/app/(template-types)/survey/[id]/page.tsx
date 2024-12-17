import Grid from "@/components/ui/Grid";
import TemplateQuestionWrapper from "@/components/ui/templateUi/TemplateQuestionWrap";
import TemplateTitle from "@/components/ui/templateUi/TemplateTitle";
import { BASE_NEST_URL } from "@/config/base";
import {
  FetchTemplateForm,
  RespondentsAndMaxGroup,
  TemplateItemMetadata,
} from "@/types/template.type";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import classes from "./page.module.scss";
import TemplateStatus from "@/components/templateUtill/TemplateStatus";
import SurveyForm from "@/app/(template-types)/survey/components/SurveyForm";
import BackButton from "@/components/ui/button/BackButton";
import ThumbNail from "@/app/template/_component/thumbNail/ThumbNail";
import { SURVEY_EDITOR_TYPE } from "@/app/(template-made)/made/[...madeType]/components/survey/CreateSurvey";

type SurveyDetailTemplateParams = {
  params: { id: number };
};

// 동적 생성
export const dynamicParams = true;
export async function generateStaticParams() {
  let url = `${BASE_NEST_URL}/template?sort=all`;
  url += "&page=1";

  /**
   * 정적 페이지는 초기 Page 1만 Static으로 생성하고 이후 페이지들은 정적으로 생성되길 유도함
   */
  const response = await fetch(url);
  const {
    data: listResponse,
  }: { data: TemplateItemMetadata<RespondentsAndMaxGroup>[] } =
    await response.json();

  return listResponse.map((template) => {
    if ("id" in template) {
      return { id: template.id.toString() };
    }
  });
}

export async function generateMetadata({
  params: { id },
}: SurveyDetailTemplateParams): Promise<Metadata> {
  const response = await fetch(`${BASE_NEST_URL}/template/survey/${id}`);

  if (!response.ok) {
    return {
      title: "Page Not Found",
      description: "The requested template was not found.",
    };
  }

  const data: FetchTemplateForm = await response.json();

  return {
    title: data.title,
    description: data.description,

    openGraph: {
      title: data.title,
      description: data.description,
      images: "",
    },
  };
}

export default async function SurveyDetailTemplate({
  params: { id },
}: SurveyDetailTemplateParams) {
  const response = await fetch(`${BASE_NEST_URL}/template/survey/${id}`);
  const data: FetchTemplateForm = await response.json();

  if (!data) {
    notFound();
  }

  const {
    title,
    description,
    thumbnail,
    startDate,
    endDate,
    createdAt,
    creator,
  } = data;

  return (
    <>
      <Grid.smallCenter>
        <BackButton />
        <TemplateQuestionWrapper>
          <ThumbNail thumbnail={thumbnail} />

          <div className={classes.templateSumeryWrap}>
            <TemplateStatus
              startDate={startDate}
              endDate={endDate}
              createdAt={createdAt}
            />
            <TemplateTitle>{title}</TemplateTitle>
            {/* <DateRange dateRange={dateRange} /> */}

            {/* Desciprtion */}
            <div className={classes.description}>{description}</div>
            {/* date */}
            <div className={classes.userDisplayWrapper}>
              {/* User Info + Role Display  */}
              {/* <UserRoleDisplay
                user_nickname={user_nickname}
                user_role={user_role}
              /> */}
              {/* <span>{todayCompare.fromNow(createdAt)}</span> */}
              <div> {creator?.nickname}</div>
            </div>
          </div>
        </TemplateQuestionWrapper>

        {/* survey Form */}
        <SurveyForm {...data} />
      </Grid.smallCenter>
    </>
  );
}
