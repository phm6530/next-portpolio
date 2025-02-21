"use client";
import TabRounded from "@/components/ui/tab-rounded";
import { BOARD_CATEGORIES } from "@/types/board";
import { useRouter } from "next/navigation";

export default function BoardCategoriesWrapper({
  curBoard,
}: {
  curBoard: string;
}) {
  const router = useRouter();

  return (
    <div className="flex gap-2 mb-4 mt-8">
      {Object.entries(BOARD_CATEGORIES).map(([key, value], idx) => {
        return (
          <TabRounded
            key={`${idx}-${key}`}
            onClick={() => router.push(`/community/${key}`)}
            active={curBoard === key}
          >
            {value}
          </TabRounded>
        );
      })}
    </div>
  );
}
