import { boardCateogries, CategoriesKey } from "@/types/board";
import BoardForm from "./board-write-form";
import SecondaryMessageBox from "@/app/(protected-page)/(template-made)/components/Header/SecondaryMessageBox";

export default function BoardWrite({
  params,
}: {
  params: { board: CategoriesKey };
}) {
  const boardName = boardCateogries[params.board];

  return (
    <>
      <SecondaryMessageBox
        title={`${boardName} 게시판 \n`}
        description="한줄 남겨주시면 저에게 큰 힘이 됩니다 ..!"
      />
      <BoardForm boardKey={params.board} boardName={boardName} />
    </>
  );
}
