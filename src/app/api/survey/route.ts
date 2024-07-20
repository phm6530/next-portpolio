import { apiErrorhandler } from "@/app/lib/apiErrorHandler";
import { NextResponse } from "next/server";

const getDatabase = async () => {
  const surveys = [
    { id: 1, title: "Survey 1" },
    { id: 2, title: "Survey 2" },
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
