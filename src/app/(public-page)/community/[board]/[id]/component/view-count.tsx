"use client";
import { Skeleton } from "@/components/ui/skeleton";
import { BASE_NEST_URL } from "@/config/base";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

// type TrackingCookieName = `${string}_${string}_${string}`;

export default function ViewCount({ className }: { className?: string }) {
  const { board: category, id } = useParams();

  const { data: result, isLoading } = useQuery({
    queryKey: ["detail-page", id, category],
    queryFn: async () => {
      const response = await fetch(
        `${BASE_NEST_URL}/board/view/${category}/${id}`,
        { credentials: "include" }
      );
      return response.json();
    },
  });

  return (
    <>
      {isLoading ? (
        <div className="flex gap-3">
          <Skeleton className="w-10 h-4" />
          <Skeleton className="w-5 h-4" />
        </div>
      ) : (
        <span className={cn("text-[10px] text-muted-foreground", className)}>
          조회수 {result?.count}
        </span>
      )}
    </>
  );
}
