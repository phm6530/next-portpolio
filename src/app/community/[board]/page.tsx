import { notFound, useRouter } from "next/navigation";
import SecondaryMessageBox from "@/app/(protected-page)/(template-made)/components/Header/SecondaryMessageBox";
import { Button } from "@/components/ui/button";
import SearchBarWrapper from "../component/SearchBarWrapper";
import Link from "next/link";
import { BOARD_CATEGORIES, CategoriesKey } from "@/types/board";
import BoardList from "../component/BoardList";
import { Suspense } from "react";
import LoadingWrapper from "@/components/shared/loading/loading-wrapper";
import TabRounded from "@/components/ui/tab-rounded";
import BoardCategoriesWrapper from "./board-categories";

export default async function BoardListPage({
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
  function isBoardCategory(key: string) {
    return key in BOARD_CATEGORIES;
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

  const boardName = BOARD_CATEGORIES[params.board];

  return (
    <>
      <SecondaryMessageBox
        title={`${boardName} 게시판 \n`}
        description="한줄 남겨주시면 저에게 큰 힘이 됩니다 ..!"
      />

      {/* Categories */}
      <BoardCategoriesWrapper curBoard={params.board} />

      {/* Search Bar */}
      <div className="flex gap-5 [&>div:first-child]:flex-1">
        {/* 검색처리를 위해 Client 한번더 감쌓았음 */}
        <SearchBarWrapper />
        <Button asChild size={"lg"} className="p-6">
          <Link href={`/community/${params.board}/write`}>글쓰기</Link>
        </Button>
      </div>
      {/* list */}
      <section className="mt-11 mb-7">
        <Suspense fallback={<LoadingWrapper />}>
          <BoardList
            category={params.board}
            keyword={keyword || searchParams?.search}
            curPage={page}
          />
        </Suspense>
      </section>
    </>
  );
}
