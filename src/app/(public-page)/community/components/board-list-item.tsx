import UserRoleDisplay from "@/components/ui/userRoleDisplay/UserRoleDisplay";
import { ListItemType } from "./board-list";
import Link from "next/link";
import dayjs from "dayjs";
import { Eye, MessageSquareMore } from "lucide-react";
import { cn } from "@/lib/utils";

export default function BoardListItem({
  itemData,
}: {
  itemData: ListItemType;
}) {
  return (
    <div className="border-b py-3 flex flex-col gap-3 ">
      <Link
        href={`/community/${itemData.category}/${itemData.id}`}
        className="mb-1"
      >
        <div className="cursor-pointer hover:text-primary text-sm flex gap-2  items-center">
          <p className="mt-[1px] text-sm md:text-base line-clamp-1">
            {itemData.title}
          </p>

          {itemData.commentCnt !== 0 && (
            <span className="text-[13px] flex items-center gap-1 ml-3 ">
              <MessageSquareMore className="w-3.5 h-3.5 opacity-50" />
              <span className={cn("opacity-60")}>{itemData.commentCnt}</span>
            </span>
          )}
        </div>
      </Link>
      <div className="flex items-center text-sm">
        {/* 유저 or 익명 */}
        <UserRoleDisplay
          role={itemData.creator.role}
          nickname={itemData.creator.nickname}
          size={"sm"}
        />

        <div className="opacity-50 text-[11px] ml-6">
          {dayjs(itemData.createdAt).format("YYYY. M. DD")}
        </div>

        <div className="flex items-center ml-auto gap-2 ">
          <div className="text-muted-foreground text-xs ml-auto">
            <span className="text-[12px] flex gap-1">
              <Eye className="w-4 h-4 opacity-50" /> {itemData.view}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
