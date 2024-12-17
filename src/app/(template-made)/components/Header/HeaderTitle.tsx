import classes from "./HeaderTitle.module.scss";
import InfoSvg from "/public/asset/icon/info.svg";

export default function HeaderTitle({
  title,
  description,
}: {
  title: string;
  description?: string;
}) {
  return (
    <>
      <div className={classes.madeHeader}>
        {/* <div className={classes.docbar}>Step 1</div> */}
        <h1>{title}</h1>
        {description && (
          <div className={classes.description}>
            <InfoSvg /> {description}
          </div>
        )}
      </div>
    </>
  );
}
