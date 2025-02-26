import { Skeleton } from "../skeleton";

export default function LoadingSkeleton({
  loadingText = "L O A D I N G ...",
}: {
  loadingText?: string;
}) {
  return (
    <div className="relative [aspect-ratio:16/9]  rounded-md overflow-hidden">
      <Skeleton className="w-full h-full " />
      <div className="absolute z-10 top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
        <span className="text-foreground/70">{loadingText}</span>
      </div>
    </div>
  );
}
