"use client";
import { useRouter } from "next/navigation";
import { boardCateogries, CategoriesValues } from "../page";
import classes from "./BoardCategories.module.scss";

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
        console.log(key);
        return (
          <button
            key={`category-${val}`}
            className={`${val === curCategory ? classes.active : undefined}`}
            onClick={() => router.push(`/community/${key}`)}
          >
            {val}
          </button>
        );
      })}
    </div>
  );
}
