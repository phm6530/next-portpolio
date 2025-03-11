"use server";
import { BASE_NEST_URL } from "@/config/base";
import { HttpError } from "@/config/error";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

type ActionsProps = {
  endPoint: string;
  tags?: string[];
  requireAuth?: boolean;
  options?: RequestInit;
};

type SuccessResponse<T> = {
  success: true;
  result: T;
  message?: undefined;
  statusCode?: number;
};

type ErrorResponse = {
  success: false;
  result?: undefined;
  message: string;
  statusCode?: number;
};

export const withFetchRevaildationAction = async <T>({
  endPoint,
  tags,
  requireAuth,
  options,
}: ActionsProps): Promise<SuccessResponse<T> | ErrorResponse> => {
  // Cookie
  const cookieStore = cookies();
  const authCookie = cookieStore.get("token");

  if (requireAuth && !authCookie) {
    return {
      success: false,
      message: "인증 토큰이 없습니다.",
      statusCode: 401,
    };
  }

  try {
    const result = await fetch(`${BASE_NEST_URL}/${endPoint}`, {
      ...options,
      headers: {
        ...(options?.body && { "Content-Type": "application/json" }),
        ...(requireAuth &&
          authCookie && { Authorization: `Bearer ${authCookie.value}` }),
        ...options?.headers,
      },
    });

    if (!result.ok) {
      const error = await result.json();

      if (error.statusCode === 404) {
        throw new Error("잘못된 요청이거나 없는 페이지입니다.");
      }
      if (error.statusCode === 401) {
        throw new Error("권한이 없거나 만료된 토큰입니다.");
      } else {
        throw new Error(error.message || "Request Faild");
      }
    }

    if (tags && tags.length > 0) for (const tag of tags) revalidateTag(tag);

    return {
      success: true,
      result: await result.json(),
    };
  } catch (error) {
    // nest.js는 statusCode를 반환하니까 생성함
    if (error instanceof HttpError) {
      return {
        success: false,
        message: error.message,
        statusCode: error.statusCode,
      };
    } else if (error instanceof Error) {
      return {
        success: false,
        message: error.message,
        statusCode: 500,
      };
    } else {
      return {
        success: false,
        message: "서버에 문제가 있습니다.",
        statusCode: 500,
      };
    }
  }
};
