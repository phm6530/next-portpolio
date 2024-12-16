import classes from "./LoadingSkeleton.module.scss";

export default function LoadingSkeleton({
  loadingText = "LOADING ...",
}: {
  loadingText?: string;
}) {
  return (
    <div className={`${classes.skeleton}`}>
      <div className={classes.loading}>{loadingText}</div>
    </div>
  );
}
