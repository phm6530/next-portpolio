import SearchBar from "@/components/ui/SearchBar/SearchBar";
import { notFound } from "next/navigation";
import BoardList from "./component/list/BoardList";
import HeaderTitle from "@/app/(template-made)/components/Header/HeaderTitle";
import Button from "@/components/ui/button/Button";
import classes from "./page.module.scss";

export const boards = { free: "자유", notice: "공지사항" } as const;
export type BoardKeys = keyof typeof boards;

export default async function Board({
  params,
}: {
  params: { board: BoardKeys };
}) {
  function isBoardCategory(key: string): key is keyof typeof boards {
    return key in boards;
  }

  if (!isBoardCategory(params.board)) {
    notFound();
  }
  const boardName = boards[params.board];
  return (
    <>
      <HeaderTitle
        title={`${boardName} 게시판 \n`}
        description="한줄 남겨주시면 감사드릴께요!"
      />
      {/* <h3 className={classes.boardTitle}>{boardName} 게시판</h3> */}

      {/* Search Bar */}
      <div className={classes.actionArea}>
        <SearchBar placeholder="검색어를 입력해주세요" />
        <Button.solid>글쓰기</Button.solid>
      </div>

      {/* list */}
      <BoardList boardCategory={params.board} />
    </>
  );
}
