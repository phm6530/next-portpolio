import { queryClient } from "@/config/queryClient";

export default async function requestHandler<T>(
  cb: () => Promise<Response>
): Promise<T> {
  try {
    const response = await cb();
    if (!response.ok) {
      if (response.status === 401) {
        // 401 에러 처리
        if (typeof window !== "undefined") {
          console.log("실행되냐?");
          queryClient.clear();
        }

        throw new Error("UNAUTHORIZED");
      } else if (response.status === 404) {
        throw new Error("NOT_FOUND");
      } else {
        const errorMsg = await response.json();
        throw new Error(errorMsg.message);
      }
    }

    return await response.json();
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("알수 없는 오류");
    }
  }
}
