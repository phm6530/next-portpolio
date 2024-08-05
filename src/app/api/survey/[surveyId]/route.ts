import { apiErrorHandler } from "@/app/lib/apiErrorHandler";
import { SurveyItemProps } from "@/types/survey";
import { NextResponse, NextRequest } from "next/server";

const DUMMY_ITEM: { [key: string]: SurveyItemProps } = {
  5: {
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
};

// GET 메서드 처리
export async function GET(
  req: NextRequest,
  { params }: { params: { surveyId: string } }
) {
  try {
    const id = params.surveyId;
    const surveys = DUMMY_ITEM[id] ? DUMMY_ITEM[id] : null;

    // JSON 응답
    return NextResponse.json(surveys);
  } catch (error) {
    return apiErrorHandler(error);
  }
}
