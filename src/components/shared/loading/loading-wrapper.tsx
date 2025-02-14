import LoadingSpiner from "@/components/ui/LoadingSpiner";

export default function LoadingWrapper() {
  return (
    <div className="relative w-full min-h-[150px]">
      <LoadingSpiner />
    </div>
  );
}
