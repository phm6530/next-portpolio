export const boardCateogries = {
  free: "자유",
  notice: "공지사항",
  qa: "Q&A",
} as const;
export type CategoriesKey = keyof typeof boardCateogries;
export type CategoriesValues = (typeof boardCateogries)[CategoriesKey];
