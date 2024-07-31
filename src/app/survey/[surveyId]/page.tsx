// pages/survey/[surveyId].tsx
import { getSurveyItem } from "@/app/_services/surveySerivce";
import { notFound } from "next/navigation";

export async function generateMetadata({
  params,
}: {
  params: { surveyId: number };
}) {
  const surveyItem = await getSurveyItem(params.surveyId);

  if (!surveyItem) {
    notFound();
  }

  return {
    title: surveyItem.surveyTitle,
    description: surveyItem.surveyTitle,
  };
}

export default async function Page({
  params,
}: {
  params: { surveyId: number };
}) {
  const { surveyId } = params;

  if (!surveyId) {
    notFound();
  }
  const surveyItem = await getSurveyItem(surveyId);

  return (
    <>
      {surveyId}
      {surveyItem ? surveyItem.surveyTitle : "없음"}
    </>
  );
}
