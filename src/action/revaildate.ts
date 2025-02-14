"use server";

import { revalidateTag } from "next/cache";

export const revaildateTags = async <T>(
  cb: () => Promise<T>,
  tags: string[]
): Promise<T> => {
  const result = await cb();

  // 초기화..
  tags.forEach((tag) => revalidateTag(tag));

  return result;
};
