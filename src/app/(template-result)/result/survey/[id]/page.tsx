import ResultComments from "@/app/(template-result)/components/ResultComments";
import ResultSummry from "@/app/(template-result)/components/ResultSummry";
import { BASE_NEST_URL } from "@/config/base";
import { SurveyResult } from "@/types/surveyResult.type";
import { Metadata } from "next";

export async function fetchSurveyData(id: string): Promise<SurveyResult> {
  const response = await fetch(`${BASE_NEST_URL}/answer/survey/${id}`, {
    cache: "force-cache",
    next: {
      revalidate: 60,
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch survey data: ${response.statusText}`);
  }

  const data: SurveyResult = await response.json();
  return data;
}

export async function generateMetadata({
  params: { id },
}: {
  params: { id: string };
}): Promise<Metadata> {
  const data = await fetchSurveyData(id);
  return {
    title: data.title,
    description: data.description,
    openGraph: {
      title: data.title,
      description: data.description,
    },
  };
}

export default async function SurveyResultPage({
  params: { id },
}: {
  params: { id: string };
}) {
  return (
    <>
      {/* template Summry*/}
      <ResultSummry id={id} />

      {/* Comments */}
      <ResultComments type="survey" id={id} />
    </>
  );
}
