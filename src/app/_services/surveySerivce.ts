import { SurveyItemProps } from "@/types/survey";

export async function getList(): Promise<SurveyItemProps[]> {
  try {
    const response = await fetch("http://localhost:3000/api/survey", {
      next: {
        revalidate: 10,
      },
    });
    if (!response.ok) {
      throw new Error("서버 이상");
    }

    // await new Promise((resolve) => setTimeout(resolve, 3000));
    return response.json();
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("알 수 없는 에러");
    }
  }
}

export async function getSurveyItem(
  surveyId: number
): Promise<SurveyItemProps> {
  try {
    const response = await fetch(
      `http://localhost:3000/api/survey/${surveyId}`,
      {
        next: {
          revalidate: 10,
          tags: ["surveyItem", surveyId + ""],
        },
      }
    );

    if (!response.ok) {
      throw new Error("서버 이상");
    }

    // const cacheStatus = response.headers.get("x-cache") ? "CACING" : "MISS";
    // console.log(`Cache Status: ${cacheStatus}`);

    // await new Promise((resolve) => setTimeout(resolve, 3000));
    return response.json();
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
      throw new Error(error.message);
    } else {
      throw new Error("알 수 없는 에러");
    }
  }
}
