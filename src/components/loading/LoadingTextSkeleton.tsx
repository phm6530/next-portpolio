import UiLoading from "../ui/loading/UiLoading";
import classes from "./LoadingTextSkeleton.module.scss";
export default function LoadingTextSkeleton({ cnt = 6 }: { cnt?: number }) {
  const arr = Array.from({ length: cnt });

  return (
    <div className={classes.loadingWrapper}>
      {arr.map((_, idx) => {
        return (
          <div key={`loadingKey-${idx}`} className={classes.loadingItem}>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        );
      })}
    </div>
  );
}
