import { notFound, redirect } from "next/navigation";
import BoardList from "./component/list/BoardList";
import HeaderTitle from "@/app/(template-made)/components/Header/HeaderTitle";
import Button from "@/components/ui/button/Button";
import classes from "./page.module.scss";
import BoardCategories from "./component/BoardCategories";
import dynamic from "next/dynamic";
import SearchBarWrapper from "./component/SearchBarWrapper";

export const boardCateogries = {
  free: "자유",
  notice: "공지사항",
  qa: "Q&A",
} as const;
export type CategoriesKey = keyof typeof boardCateogries;
export type CategoriesValues = (typeof boardCateogries)[CategoriesKey];

export default async function Board({
  params,
}: {
  params: { board: CategoriesKey };
}) {
  function isBoardCategory(key: string): key is keyof typeof boardCateogries {
    return key in boardCateogries;
  }

  if (!isBoardCategory(params.board)) {
    notFound();
  }

  const boardName = boardCateogries[params.board];
  return (
    <>
      <HeaderTitle
        title={`${boardName} 게시판 \n`}
        description="한줄 남겨주시면 감사드릴께요!"
      />

      {/* Category button */}
      <BoardCategories categories={boardCateogries} curCategory={boardName} />

      {/* Search Bar */}
      <div className={classes.actionArea}>
        {/* 검색처리를 위해 CLinet 한번더 감쌓았음 */}
        <SearchBarWrapper />
        <Button.solid>글쓰기</Button.solid>
      </div>
      {/* list */}
      <BoardList boardCategory={params.board} />
    </>
  );
}
