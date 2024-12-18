import { redirect } from "next/dist/server/api-utils";
import { notFound } from "next/navigation";

const boards = { free: "자유" } as const;

type BoardKeys = keyof typeof boards;

export default function Board({ params }: { params: { board: BoardKeys } }) {
  function isBoardCategory(key: string): key is keyof typeof boards {
    return key in boards;
  }

  if (!isBoardCategory(params.board)) {
    notFound();
  }

  return <>{boards[params.board]} 게시판</>;
}
