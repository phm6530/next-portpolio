import classes from "./LoadingSpiner.module.scss";

export default function LoadingSpiner() {
  const arr = [...Array(12)];
  return (
    <div className={classes.sunflowerSpinner}>
      <div className={classes.petals}>
        {arr.map((_, idx) => (
          <span className={classes.petal} key={idx} />
        ))}
      </div>
    </div>
  );
}
