import { boardCateogries, CategoriesKey } from "@/types/board";
import BoardForm from "./component/BoardForm";

export default function BoardWrite({
  params,
}: {
  params: { board: CategoriesKey };
}) {
  const boardName = boardCateogries[params.board];

  return (
    <>
      <div>{boardName} 게시판</div>
      <BoardForm boardKey={params.board} boardName={boardName} />
    </>
  );
}
