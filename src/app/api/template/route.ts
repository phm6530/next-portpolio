import { surveyService } from "@/app/api/_service/surveySerivce";
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
      id: 5,
      template: "survey",
      img: "https://d33h8icwcso2tj.cloudfront.net/uploads/project/0cc22904-c448-4c48-935b-8b4b78eceea5/______2024-06-14_191238_20240616151843.jpg",
      title: "여러분의 안녕하세요 여러분의 안녕하세요 ",
      description: "설명",
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
      id: 2,
      template: "rank",
      img: "https://d33h8icwcso2tj.cloudfront.net/uploads/project/0cc22904-c448-4c48-935b-8b4b78eceea5/______2024-06-14_191238_20240616151843.jpg",
      title: "여러분의 fff",
      description: "설명",
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
      id: 4,
      template: "survey",
      img: "https://d33h8icwcso2tj.cloudfront.net/uploads/project/0cc22904-c448-4c48-935b-8b4b78eceea5/______2024-06-14_191238_20240616151843.jpg",
      title: "여러분의 fff",
      description: "설명",
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
      id: 5,
      template: "survey",
      img: "https://d33h8icwcso2tj.cloudfront.net/uploads/project/0cc22904-c448-4c48-935b-8b4b78eceea5/______2024-06-14_191238_20240616151843.jpg",
      title: "여러분의 fff",
      description: "설명",
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
      id: 4,
      template: "survey",
      img: "https://d33h8icwcso2tj.cloudfront.net/uploads/project/0cc22904-c448-4c48-935b-8b4b78eceea5/______2024-06-14_191238_20240616151843.jpg",
      title: "여러분의 평균 스펙은 어느 정도인가요?",
      description: "설명",
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
      id: 3,
      template: "survey",
      img: "https://d33h8icwcso2tj.cloudfront.net/uploads/project/0cc22904-c448-4c48-935b-8b4b78eceea5/______2024-06-14_191238_20240616151843.jpg",
      title: "여러분의 평균 스펙은 어느 정도인가요?",
      description: "설명",
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
