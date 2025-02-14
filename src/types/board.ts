export const boardCateogries = {
  free: "자유",
  qa: "Q&A",
  notice: "피드백",
} as const;
export type CategoriesKey = keyof typeof boardCateogries;
export type CategoriesValues = (typeof boardCateogries)[CategoriesKey];
