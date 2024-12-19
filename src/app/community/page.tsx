import BoardPage, { BoardKeys } from "./[board]/page";

type TempParams = { board: BoardKeys };

//초기 게시판은 Free로 추후에 추가하던...
export default function Page() {
  const params: TempParams = { board: "free" };
  return <BoardPage params={params} />;
}
