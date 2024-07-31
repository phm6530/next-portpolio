import { apiErrorhandler } from "@/app/lib/apiErrorHandler";
import { SurveyItemProps } from "@/types/survey";
import { NextResponse } from "next/server";

const getDatabase = async () => {
  const surveys: SurveyItemProps[] = [
    {
      surveyId: 5,
      img: "https://d33h8icwcso2tj.cloudfront.net/uploads/project/0cc22904-c448-4c48-935b-8b4b78eceea5/______2024-06-14_191238_20240616151843.jpg",
      surveyTitle: "여러분의 fff",
      createUser: {
        username: "리슨업",
      },
      ParticipationCnt: 130,
      ParticipationMain: {
        ageRange: 20,
        gender: "men",
      },
    },
    {
      surveyId: 4,
      img: "https://d33h8icwcso2tj.cloudfront.net/uploads/project/0cc22904-c448-4c48-935b-8b4b78eceea5/______2024-06-14_191238_20240616151843.jpg",
      surveyTitle: "여러분의 평균 스펙은 어느 정도인가요?",
      createUser: {
        username: "리슨업",
      },
      ParticipationCnt: 130,
      ParticipationMain: {
        ageRange: 20,
        gender: "men",
      },
    },
    {
      surveyId: 3,
      img: "https://d33h8icwcso2tj.cloudfront.net/uploads/project/0cc22904-c448-4c48-935b-8b4b78eceea5/______2024-06-14_191238_20240616151843.jpg",
      surveyTitle: "여러분의 평균 스펙은 어느 정도인가요?",
      createUser: {
        username: "리슨업",
      },
      ParticipationCnt: 130,
      ParticipationMain: {
        ageRange: 20,
        gender: "men",
      },
    },
  ];

  return surveys;
};

// GET 메서드 처리
export async function GET() {
  try {
    const surveys = await getDatabase();

    // JSON 응답
    return NextResponse.json(surveys);
  } catch (error) {
    return apiErrorhandler(error);
  }
}
