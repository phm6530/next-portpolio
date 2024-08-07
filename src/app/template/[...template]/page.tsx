import { getTemplateDetail } from "@/app/_services/surveySerivce";
import { Metadata } from "next";
import { notFound } from "next/navigation";

type templateDetailParams = { template: [string, string] };
const vaildateTemplateType = ["survey", "rank"] as const;
type TemplateUnionType = (typeof vaildateTemplateType)[number];

//Meta
export async function generateMetadata({
  params,
}: {
  params: templateDetailParams;
}): Promise<Metadata> {
  const [templateType, id] = params.template;

  if (!vaildateTemplateType.includes(templateType as TemplateUnionType)) {
    notFound();
  }

  try {
    const surveyItem = await getTemplateDetail(
      templateType as TemplateUnionType,
      id
    );
    if (!surveyItem) notFound();

    return {
      title: surveyItem.title,
      description: surveyItem.title,
      openGraph: {
        images: [
          {
            url: surveyItem.img,
          },
        ],
      },
    };
  } catch (error) {
    console.error(error);
    notFound();
  }
}

export default async function Page({
  params,
}: {
  params: templateDetailParams;
}) {
  const [templateType, id] = params.template;
  const surveyItem = await getTemplateDetail(
    templateType as TemplateUnionType,
    id
  );

  return (
    <>
      {id}
      {surveyItem.title}
    </>
  );
}
