import UserRoleDisplay from "@/components/layout/userRoleDisplay/UserRoleDisplay";
import { ListItemType } from "./BoardList";
import classes from "./BoardListItem.module.scss";
import Link from "next/link";

export default function BoardListItem({
  itemData,
}: {
  itemData: ListItemType;
}) {
  return (
    <div className="border-b py-4 flex flex-col gap-5">
      <Link href={`/community/${itemData.category}/${itemData.id}`}>
        <div className="cursor-pointer hover:text-primary text-sm flex items-center gap-3">
          {itemData.title}
          {itemData.commentCnt > 0 && (
            <span className="text-[11px] opacity-60 text-indigo-500">
              [{itemData.commentCnt}]
            </span>
          )}
        </div>
      </Link>
      <div className="flex items-center text-sm">
        {/* 유저 or 익명 */}
        <UserRoleDisplay
          role={itemData.creator.role}
          nickname={itemData.creator.nickname}
        />

        <div className={classes.createAt}>{itemData.createAt}</div>
        <div className={classes.viewCnt}>조회수 {itemData.view}</div>
      </div>
    </div>
  );
}
