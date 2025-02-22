"use client";
import { useRouter } from "next/navigation";

import classes from "./BoardCategories.module.scss";
import { boardCateogries, CategoriesValues } from "@/types/board";

type BoardCategoriesType = typeof boardCateogries;

export default function BoardCategories({
  categories,
  curCategory,
}: {
  categories: BoardCategoriesType;
  curCategory: CategoriesValues;
}) {
  const router = useRouter();

  return (
    <div className={classes.categoriesWrapper}>
      {Object.entries(categories).map(([key, val]) => {
        return (
          <button
            key={`category-${val}`}
            className={`${
              val === curCategory ? classes.active : undefined
            }`}
            onClick={() => router.push(`/community/${key}`)}
          >
            {val}
          </button>
        );
      })}
    </div>
  );
}
