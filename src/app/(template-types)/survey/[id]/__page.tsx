import { fetchTemplateDetail } from "@/lib/surveySerivce";
import { AddsurveyDetailProps } from "@/types/templateSurvey";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { queryClient } from "@/config/queryClient";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import dynamic from "next/dynamic";
import SurveyTemplateDetail from "@/app/template/[...detail]/SurveyTemplateDetail";

import { auth } from "@/auth";
import DateCompareToday from "@/util/DateCompareToday";
import TemplatePending from "@/components/templateUtill/TemplatePending";
import AdminController from "@/app/template/admin/_component/AdminController";
import Grid from "@/components/ui/Grid";
import BackButton from "@/components/ui/button/BackButton";
import imgUrlMapper from "@/util/imgUrlMapper";
import { ageGroupProps, Gender } from "@/types/template";
import { Suspense } from "react";

// Dynamic import of components
// const DynamicSurveyTemplateDetail = dynamic(
//   () => import("@/app/template/[...detail]/SurveyTemplateDetail"),
//   { ssr: false, loading: () => <p>Loading Survey Template...</p> } // This makes sure it's only loaded on the client side
// );

const DynamicRankTemplateDetail = dynamic(
  () => import("@/app/template/[...detail]/RankTemplateDetail"),
  { ssr: false, loading: () => <p>Loading Survey Template...</p> }
);

const vaildateTemplateType = ["survey", "rank"] as const;

export type TemplateUnionType = (typeof vaildateTemplateType)[number];
type templateDetailParams = { detail: [TemplateUnionType, string] };

//템플릿 타입
export type TemplateDetailProps<T extends TemplateUnionType> =
  T extends "survey" ? AddsurveyDetailProps : T extends "rank" ? never : never;

//Meta
export async function generateMetadata({
  params,
}: {
  params: templateDetailParams;
}): Promise<Metadata> {
  const [templateType, id] = params.detail;

  //template이 아니면 Error
  if (!vaildateTemplateType.includes(templateType)) {
    notFound();
  }

  try {
    const surveyItem = await queryClient.fetchQuery<
      TemplateDetailProps<TemplateUnionType>
    >({
      queryKey: [templateType, +id],
      queryFn: () =>
        fetchTemplateDetail<TemplateDetailProps<TemplateUnionType>>(
          templateType,
          +id
        ),
      staleTime: 10000,
    });

    //Error
    if (!surveyItem) notFound();

    return {
      title: surveyItem.title,
      description: surveyItem.description,
      openGraph: {
        images: [
          {
            url: surveyItem.thumbnail
              ? imgUrlMapper({ thumbnail: surveyItem.thumbnail })
              : "",
          },
        ],
      },
    };
  } catch (error) {
    notFound();
  }
}

export default async function Page({
  params,
}: {
  params: templateDetailParams;
}) {
  const [templateType, id] = params.detail;
  const session = await auth();

  const data = await queryClient.fetchQuery({
    queryKey: [templateType, +id],
    queryFn: async () => {
      await new Promise((resolve) => setTimeout(resolve, 3000));
      return fetchTemplateDetail<AddsurveyDetailProps>(templateType, +id);
    },
    staleTime: 10000,
  });
  const dayCompare = DateCompareToday();

  const {
    dateRange,
    age_group,
    gender_group,
    user_id,
    thumbnail,
    title,
    template_key,
    template,
    description,
    id: template_id,
    user_cnt,
  } = data;

  //template Date Gard
  if (!(session?.user.user_id === user_id || session?.user.role === "admin")) {
    if (dateRange.every((e) => e !== null)) {
      const [start, end] = dateRange;

      const templateStatus = dayCompare.isBefore(start)
        ? "pending"
        : dayCompare.isAfter(end)
        ? "after"
        : (null as never);

      //종료일과 시작일에 따른 상태보여주기
      if (templateStatus) {
        return (
          <Suspense fallback={<>loading...</>}>
            <Grid.smallCenter>
              <TemplatePending
                dateRange={dateRange}
                thumbnail={thumbnail}
                description={description}
                title={title}
                templateStatus={templateStatus}
                templateType={templateType}
                templateId={id}
                ageGroup={age_group as ageGroupProps}
                genderGroup={gender_group as Gender}
                userCnt={user_cnt}
              />
            </Grid.smallCenter>
          </Suspense>
        );
      }
    }
  }

  return (
    <Grid.smallCenter>
      <Suspense fallback={<div>loading...</div>}>
        <div
          style={{
            marginBottom: "20px",
          }}
        >
          <BackButton />
        </div>
        <HydrationBoundary state={dehydrate(queryClient)}>
          {session && session.user.role === "admin" && (
            <AdminController
              user={session.user}
              curTemplateKey={template_key as string}
              curTemplateType={template}
              curTemplateId={template_id}
            />
            // <AdminButton id={id} /> // 클라이언트 컴포넌트 사용
          )}

          {(() => {
            if (templateType === "survey") {
              return (
                <SurveyTemplateDetail
                  templateType={templateType}
                  surveyId={+id}
                  session={session}
                />
              );
            }
            if (templateType === "rank") {
              return <DynamicRankTemplateDetail />;
            }
          })()}
        </HydrationBoundary>{" "}
      </Suspense>
    </Grid.smallCenter>
  );
}
