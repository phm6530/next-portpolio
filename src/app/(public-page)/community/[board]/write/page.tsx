import { BOARD_CATEGORIES, CategoriesKey } from "@/types/board";
import BoardForm from "./board-write-form";
import SubheaderDescrition from "@/components/ui/subheader-description";

export default function BoardWrite({
  params,
}: {
  params: { board: CategoriesKey };
}) {
  const boardName = BOARD_CATEGORIES[params.board];

  return (
    <>
      <SubheaderDescrition
        title={`${boardName} 게시판 \n`}
        description="한줄 남겨주시면 저에게 큰 힘이 됩니다 ..!"
      />
      <BoardForm boardKey={params.board} boardName={boardName} />
    </>
  );
}
