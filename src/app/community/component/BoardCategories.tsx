"use client";
import { boardCateogries, CategoriesValues } from "@/types/board";
import NavLink from "@/components/ui/nav-link";

type BoardCategoriesType = typeof boardCateogries;

export default function BoardCategories({
  categories,
  curCategory,
}: {
  categories: BoardCategoriesType;
  curCategory: CategoriesValues;
}) {
  return (
    <div className="pt-8 pb-5 flex gap-1.5">
      {Object.entries(categories).map(([key, val]) => {
        return (
          <>
            <NavLink
              href={`/community/${key}`}
              active={val === curCategory}
              className="border min-w-5 py-2 px-4 rounded-full text-sm"
              border
            >
              {val}
            </NavLink>
          </>
        );
      })}
    </div>
  );
}
