import { CategoriesKey } from "@/types/board";
import BoardPage from "./[board]/page";

type TempParams = { board: CategoriesKey };

//초기 게시판은 Free로 추후에 추가하던...
export default function Page({
  searchParams,
}: {
  searchParams: { search: string };
}) {
  const params: TempParams = { board: "free" };
  return <BoardPage params={params} keyword={searchParams.search} />;
}
