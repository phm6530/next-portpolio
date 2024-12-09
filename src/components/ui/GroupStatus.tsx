import { RespondentsAndMaxGroup } from "@/types/template.type";
import classes from "./GroupStatus.module.scss";
import Image from "next/image";
import FemaleIcon from "/public/asset/icon/female.svg";
import MaleIcon from "/public/asset/icon/male.svg";

type RespondetsDetail = {
  isGenderCollected: boolean;
  isAgeCollected: boolean;
} & Pick<RespondentsAndMaxGroup, "maxGroup">;

const GroupStatus: React.FC<RespondetsDetail> = ({ maxGroup }) => {
  const { maxCnt, genderGroup, ageGroup } = maxGroup;

  let icon = null;
  let genderText = "";

  switch (genderGroup) {
  case "female":
    icon = <FemaleIcon width={17} height={17} alt="femaleIcon" />;
    genderText = "여성";
    break;
  case "male":
    icon = <MaleIcon width={17} height={17} alt="maleIcon" />;
    genderText = "남성";
    break;
  default:
    break;
  }

  return (
    <>
      <div className={classes.groupParticipants}>
        {icon}
        {ageGroup && `${ageGroup}대`}

        <>
          <span
            className={genderGroup === "male" ? classes.male : classes.female}
          >
            {genderText}
          </span>
          의 참여율이 가장 높습니다.
        </>
      </div>
    </>
  );
};

export default GroupStatus;
