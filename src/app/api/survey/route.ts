import { surveyService } from "@/app/api/survey/_service/surveySerivce";
import { apiErrorHandler } from "@/app/lib/apiErrorHandler";
import {
  AddSurveyFormProps,
  SurveyItemProps,
  templateMetaProps,
} from "@/types/survey";
import { NextRequest, NextResponse } from "next/server";

const getDatabase = async () => {
  const surveys: SurveyItemProps[] = [
    {
      surveyId: 5,
      img: "https://d33h8icwcso2tj.cloudfront.net/uploads/project/0cc22904-c448-4c48-935b-8b4b78eceea5/______2024-06-14_191238_20240616151843.jpg",
      surveyTitle: "여러분의 안녕하세요 여러분의 안녕하세요 ",
      createUser: {
        username: "리슨업",
      },
      ParticipationCnt: 130,
      ParticipationMain: {
        ageRange: 40,
        gender: "men",
      },
    },
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
        gender: "women",
      },
    },
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
    return apiErrorHandler(error);
  }
}

//Survey Post Controller
export async function POST(req: NextRequest) {
  try {
    const data: AddSurveyFormProps & templateMetaProps = await req.json();

    await surveyService(data);

    return NextResponse.json({ message: "success" });
  } catch (error) {
    return apiErrorHandler(error);
  }
}
