import { notFound } from "next/navigation";
import BoardList from "../component/BoardList";
import HeaderTitle from "@/app/(template-made)/components/Header/HeaderTitle";
import Button from "@/components/ui/button/Button";
import classes from "./page.module.scss";
import BoardCategories from "../component/BoardCategories";
import SearchBarWrapper from "../component/SearchBarWrapper";
import Link from "next/link";
import { boardCateogries, CategoriesKey } from "@/types/board";

export default async function Board({
  params,
  keyword,
  curPage,
  searchParams,
}: {
  params: { board: CategoriesKey };
  keyword?: string;
  curPage?: string;
  searchParams?: { search: string; page: string };
}) {
  function isBoardCategory(key: string): key is keyof typeof boardCateogries {
    return key in boardCateogries;
  }

  if (!isBoardCategory(params.board)) {
    notFound();
  }

  const page =
    curPage !== undefined
      ? +curPage
      : searchParams?.page !== undefined
      ? +searchParams.page
      : 0;

  const boardName = boardCateogries[params.board];
  return (
    <>
      <HeaderTitle
        title={`${boardName} 게시판 \n`}
        description="한줄 남겨주시면 저에게 큰 힘이 됩니다 ..!"
      />

      {/* Category button */}
      <BoardCategories categories={boardCateogries} curCategory={boardName} />

      {/* Search Bar */}
      <div className={classes.actionArea}>
        {/* 검색처리를 위해 CLinet 한번더 감쌓았음 */}
        <SearchBarWrapper />
        <Link href={`/community/${params.board}/write`}>
          <Button.submit>글쓰기</Button.submit>
        </Link>
      </div>

      {/* list */}
      <BoardList
        boardCategory={params.board}
        keyword={keyword || searchParams?.search}
        curPage={page}
      />
    </>
  );
}
