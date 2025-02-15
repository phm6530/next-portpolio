"use server";

import { revalidateTag } from "next/cache";

export const revaildateTags = async <T>(
  cb: () => Promise<T>,
  tags: string[]
): Promise<T> => {
  // callback
  const result = await cb();

  // Revaildate 초기화
  tags.forEach((tag) => revalidateTag(tag));
  return result;
};
