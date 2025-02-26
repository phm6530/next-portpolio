import { revalidateTag } from "next/cache";

export const withFetchRevaildation = async <T>(
  cb: () => Promise<T>,
  tags: string[]
): Promise<T> => {
  try {
    const result = (await cb()) as Response;

    if (!result.ok) {
      const errorMsg = await result.json();
      throw new Error(errorMsg.message || "error");
    }

    tags.forEach((tag) => revalidateTag(tag));
    return result.json();
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    } else {
      throw new Error("서버에 문제가 있습니다.");
    }
  }
};
