import { fetchTemplateDetail } from "@/app/_services/surveySerivce";
import SurveyTemplateDetail from "@/app/template/[...template]/SurveyTemplateDetail";
import { templateItemProps, templateMetaProps } from "@/types/template";
import { surveyDetailProps } from "@/types/templateSurvey";
import { Metadata } from "next";
import { notFound } from "next/navigation";

const vaildateTemplateType = ["survey", "rank"] as const;
export type TemplateUnionType = (typeof vaildateTemplateType)[number];
type templateDetailParams = { template: [TemplateUnionType, string] };

//Meta
export async function generateMetadata({
  params,
}: {
  params: templateDetailParams;
}): Promise<Metadata> {
  const [templateType, id] = params.template;

  if (!vaildateTemplateType.includes(templateType)) {
    notFound();
  }

  try {
    const surveyItem = await fetchTemplateDetail<surveyDetailProps>(
      templateType,
      +id
    );

    if (!surveyItem) notFound();

    console.log('""""', surveyItem);

    return {
      title: surveyItem.title,
      description: surveyItem.title,
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
  const [templateType, id] = params.template;

  if (templateType === "survey") {
    return <SurveyTemplateDetail templateType={templateType} surveyId={+id} />;
  }

  return <></>;
}
