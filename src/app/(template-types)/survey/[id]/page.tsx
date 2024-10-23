import DateRange from "@/app/template/_component/DateRange/DateRange";
import ThumbNail from "@/app/template/_component/thumbNail/ThumbNail";
import Grid from "@/components/ui/Grid";
import TemplateQuestionWrapper from "@/components/ui/templateUi/TemplateQuestionWrap";
import TemplateTitle from "@/components/ui/templateUi/TemplateTitle";
import { BASE_NEST_URL } from "@/config/base";
import { TemplateDetilaPageResponse } from "@/types/template.type";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import classes from "./page.module.scss";
import TemplateStatus from "@/components/templateUtill/TemplateStatus";
import DateCompareToday from "@/util/DateCompareToday";
import SurveyForm from "@/app/(template-types)/survey/components/SurveyForm";

type SurveyDetailTemplateParams = {
  params: { id: number };
};

export async function generateMetadata({
  params: { id },
}: SurveyDetailTemplateParams): Promise<Metadata> {
  const response = await fetch(`${BASE_NEST_URL}/template/survey/${id}`);
  const data: TemplateDetilaPageResponse = await response.json();

  if (!response.ok) {
    return {
      title: "Page Not Found",
      description: "The requested template was not found.",
    };
  }

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
  // await new Promise((resolve) => setTimeout(resolve, 3000));

  const response = await fetch(`${BASE_NEST_URL}/template/survey/${id}`);
  const data: TemplateDetilaPageResponse = await response.json();

  console.log(data);

  if (!data) {
    notFound();
  }

  const {
    title,
    description,
    thumbnail,
    questions,
    startDate,
    endDate,
    createdAt,
    respondents,
    ...rest
  } = data;

  console.log({ ...rest });
  const todayCompare = DateCompareToday();
  return (
    <>
      <Grid.smallCenter>
        <TemplateQuestionWrapper>
          {/* <ThumbNail thumbnail={thumbnail} /> */}

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
            </div>
          </div>
        </TemplateQuestionWrapper>
      </Grid.smallCenter>

      {/* 제출 Form */}
      <SurveyForm questions={questions} {...rest} />
    </>
  );
}
