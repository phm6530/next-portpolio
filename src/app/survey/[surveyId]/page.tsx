import { getSurveyItem } from "@/app/_services/surveySerivce";

export default async function Page({
  params,
}: {
  params: { surveyId: number };
}) {
  const { surveyId } = params;
  const test = await getSurveyItem(surveyId);

  console.log("test", test);
  return (
    <>
      {surveyId}

      {test ? test.surveyTitle : "없음"}
    </>
  );
}
