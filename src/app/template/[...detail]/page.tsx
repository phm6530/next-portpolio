// import RankTemplateDetail from "@/app/template/[...detail]/RankTemplateDetail";
// import SurveyTemplateDetail from "@/app/template/[...detail]/SurveyTemplateDetail";

import { fetchTemplateDetail } from "@/app/_services/surveySerivce";
import { AddsurveyDetailProps } from "@/types/templateSurvey";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { queryClient } from "@/app/config/queryClient";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import dynamic from "next/dynamic";
import SurveyTemplateDetail from "@/app/template/[...detail]/SurveyTemplateDetail";

import { auth } from "@/auth";
import AdminButton from "@/app/template/_component/AdminButton";

// Dynamic import of components
// const DynamicSurveyTemplateDetail = dynamic(
//   () => import("@/app/template/[...detail]/SurveyTemplateDetail"),
//   { ssr: false, loading: () => <p>Loading Survey Template...</p> } // This makes sure it's only loaded on the client side
// );

const DynamicRankTemplateDetail = dynamic(
  () => import("@/app/template/[...detail]/RankTemplateDetail"),
  { ssr: false, loading: () => <p>Loading Survey Template...</p> } // This makes sure it's only loaded on the client side
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

    console.log(surveyItem);

    return {
      title: surveyItem.title,
      description: surveyItem.description,
      openGraph: {
        images: [
          {
            url: surveyItem.img ? surveyItem.img : "",
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

  await queryClient.prefetchQuery({
    queryKey: [templateType, +id],
    queryFn: () => fetchTemplateDetail<AddsurveyDetailProps>(templateType, +id),
    staleTime: 10000,
  });

  return (
    <>
      <HydrationBoundary state={dehydrate(queryClient)}>
        {session && session.user.role === "admin" && (
          <AdminButton id={id} /> // 클라이언트 컴포넌트 사용
        )}

        {(() => {
          if (templateType === "survey") {
            return (
              <SurveyTemplateDetail
                templateType={templateType}
                surveyId={+id}
              />
            );
          }
          if (templateType === "rank") {
            return <DynamicRankTemplateDetail />;
          }
        })()}
      </HydrationBoundary>
    </>
  );
}
