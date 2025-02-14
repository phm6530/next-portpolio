import { notFound } from "next/navigation";
import HeaderTitle from "@/app/(protected-page)/(template-made)/components/Header/HeaderTitle";
import { Button } from "@/components/ui/button";
import classes from "./page.module.scss";
import BoardCategories from "../component/BoardCategories";
import SearchBarWrapper from "../component/SearchBarWrapper";
import Link from "next/link";
import { boardCateogries, CategoriesKey } from "@/types/board";
import BoardList from "../component/BoardList";
import { Suspense } from "react";
import SkeletonListItem from "@/components/shared/loading/skeleton-listitem";
import LoadingSpinnerWrapper from "@/components/loading/LoadingSpinnerWrapper";
import LoadingSpiner from "@/components/ui/LoadingSpiner";
import LoadingWrapper from "@/components/shared/loading/loading-wrapper";

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
        {/* 검색처리를 위해 Client 한번더 감쌓았음 */}
        <SearchBarWrapper />
        <Button asChild size={"xxl"}>
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
