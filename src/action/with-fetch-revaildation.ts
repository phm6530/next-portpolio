"use server";
import { BASE_NEST_URL } from "@/config/base";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

type ActionsProps = {
  endPoint: string;
  tags?: string[];
  requireAuth?: boolean;
  options?: RequestInit;
};

export const withFetchRevaildationAction = async <T>({
  endPoint,
  tags,
  requireAuth,
  options,
}: ActionsProps): Promise<{
  success: boolean;
  result?: T;
  message?: string;
}> => {
  // Cookie
  const cookieStore = cookies();
  const authCookie = cookieStore.get("token");

  if (requireAuth && !authCookie) {
    throw new Error("잘못된 요청입니다.");
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
      throw new Error(error.message || "Request Faild");
    }

    if (tags && tags.length > 0) for (const tag of tags) revalidateTag(tag);

    return {
      success: true,
      result: await result.json(),
    };
  } catch (error) {
    if (error instanceof Error) {
      return {
        success: false,
        message: error.message,
      };
    } else {
      return {
        success: false,
        message: "서버에 문제가 있습니다.",
      };
    }
  }
};
