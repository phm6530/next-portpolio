import classes from "./AuthComplete.module.scss";
import Verified from "/public/asset/icon/Verified.svg";

export default function AuthComplete({
  complateText,
}: {
  complateText: string;
}) {
  return (
    <div className={classes.success}>
      <Verified />
      {complateText}
    </div>
  );
}
