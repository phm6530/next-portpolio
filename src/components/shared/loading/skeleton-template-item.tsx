import { Skeleton } from "@/components/ui/skeleton";

export default function SkeletonTemplateItem() {
  return (
    <div className="flex flex-col w-full gap-4">
      <Skeleton className="h-32 w-full rounded-xl" />
      <div className="flex flex-1 flex-col gap-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full max-w-[200px]" />
        <Skeleton className="h-4 w-full max-w-[100px]" />
      </div>
    </div>
  );
}
