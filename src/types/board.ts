export const BOARD_CATEGORIES = {
  free: "자유",
  qa: "Q&A",
  notice: "피드백",
} as const;

export type CategoriesKey = keyof typeof BOARD_CATEGORIES;
export type CategoriesValues = (typeof BOARD_CATEGORIES)[CategoriesKey];
