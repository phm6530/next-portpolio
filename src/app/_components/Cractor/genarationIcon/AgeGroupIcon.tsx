import classes from "./ageGroup.module.scss";
import ageGroup10 from "/public/asset/icon/person_2.png";
import Image from "next/image";

export default function AgeGroupIcon({
  ageGroup,
  size,
  gender,
}: {
  ageGroup: number;
  size: "large" | "small" | "extraLarge";
  gender?: "male" | "female";
}) {
  return (
    <div
      className={`${classes.ageGroupIcon} ${
        size === "large"
          ? classes.large
          : size === "small"
          ? classes.small
          : classes.extraLarge
      } ${
        gender === "female"
          ? classes.female
          : gender === "male"
          ? classes.male
          : undefined
      }`}
    >
      <div className={classes.iconWrap}>
        <Image src={ageGroup10} alt="icon" priority fill />
      </div>
      <span className={classes.ageGroup}>{ageGroup}</span> 대
    </div>
  );
}
