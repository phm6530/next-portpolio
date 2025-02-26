import { notFound } from "next/navigation";
import SubheaderDescrition from "@/components/ui/subheader-description";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { BOARD_CATEGORIES, CategoriesKey } from "@/types/board";
import { Suspense } from "react";
import LoadingWrapper from "@/components/shared/loading/loading-wrapper";
import BoardCategoriesWrapper from "./board-categories";
import SearchBarWrapper from "@/components/ui/SearchBar/searchbar-wrapper";
import BoardList from "../components/board-list";

export default async function BoardListPage({
  params,

  searchParams,
}: {
  params: { board: CategoriesKey };
  keyword?: string;
  curPage?: string;
  searchParams?: { search: string; page: string };
}) {
  function isBoardCategory(key: string) {
    return key in BOARD_CATEGORIES;
  }

  if (!isBoardCategory(params.board)) {
    notFound();
  }

  const boardName = BOARD_CATEGORIES[params.board];

  return (
    <>
      <SubheaderDescrition
        title={`${boardName} 게시판 \n`}
        description="한줄 남겨주시면 저에게 큰 힘이 됩니다 ..!"
      />

      {/* Categories */}
      <BoardCategoriesWrapper curBoard={params.board} />

      {/* Search Bar */}
      <div className="flex gap-5 [&>div:first-child]:flex-1">
        {/* 검색처리를 위해 Client 한번더 감쌓았음 */}
        <SearchBarWrapper />
        <Button asChild size={"lg"} className="p-6 rounded-sm">
          <Link href={`/community/${params.board}/write`}>글쓰기</Link>
        </Button>
      </div>

      {/* list */}
      <section className="mt-11 mb-7">
        <Suspense fallback={<LoadingWrapper />}>
          <BoardList category={params.board} keyword={searchParams?.search} />
        </Suspense>
      </section>
    </>
  );
}
