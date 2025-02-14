import { Skeleton } from "@/components/ui/skeleton";

export default function SkeletonListItem() {
  return (
    <div className="flex w-full gap-4 ">
      <Skeleton className="h-10 w-10 rounded-xl" />
      <div className="flex flex-1 flex-col gap-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full max-w-[200px]" />
      </div>
    </div>
  );
}
