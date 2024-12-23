import UserRoleDisplay from "@/components/ui/userRoleDisplay/UserRoleDisplay";
import { ListItemType } from "./BoardList";
import classes from "./BoardListItem.module.scss";
import Link from "next/link";

export default function BoardListItem({
  itemData,
}: {
  itemData: ListItemType;
}) {
  return (
    <div className={classes.BoardListItemContainer}>
      <Link href={`/community/${itemData.category}/${itemData.id}`}>
        <div className={classes.title}>
          {itemData.title} <span className={classes.commentCnt}>[12]</span>
        </div>
      </Link>
      <div className={classes.itemInfo}>
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
