import classes from "./LoadingSummrySkeleton.module.scss";

export function LoadingItem() {
  return (
    <div className={classes.loadingItem}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}

export default function LoadingSummrySkeleton({
  cnt = 6,
}: {
  cnt?: number;
}) {
  const arr = Array.from({ length: cnt });

  return (
    <div className={classes.loadingWrapper}>
      {arr.map((_, idx) => {
        return <LoadingItem key={`loadingKey-${idx}`} />;
      })}
    </div>
  );
}
