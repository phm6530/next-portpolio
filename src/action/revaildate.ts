"use server";

import { revalidateTag } from "next/cache";

export const revaildateTags = async (tags: string[]) => {
  console.log("초기화..");
  tags.forEach((tag) => revalidateTag(tag));
};
