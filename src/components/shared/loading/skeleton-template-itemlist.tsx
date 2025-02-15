import SkeletonTemplateItem from "./skeleton-template-item";

export default function SkeletonTemplateItemList({
  cnt = 8,
}: {
  cnt?: number;
}) {
  const tempArr = Array.from({ length: cnt });

  return (
    <div className="grid grid-cols-auto-fill gap-5">
      {tempArr.map((_, idx) => {
        return <SkeletonTemplateItem key={idx} />;
      })}
    </div>
  );
}
