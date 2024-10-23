import Image from "next/image";
import classes from "./GroupStatus.module.scss";
import FemaleIcon from "/public/asset/icon/mdi_face-female.png";
import MaleIcon from "/public/asset/icon/mdi_face-male.png";
import { Gender } from "@/types/template";
import { RespondentsProps } from "@/types/template.type";

type RespondetsDetail = {
  isGenderCollected: boolean;
  action: boolean;
  isAgeCollected: boolean;
} & Pick<RespondentsProps, "detail">;

const GroupStatus: React.FC<RespondetsDetail> = ({
  detail: respodentsDetail,
  action,
  isGenderCollected,
  isAgeCollected,
}) => {
  // 5명 이상부터
  if (action) {
    return (
      <div className={classes.groupParticipants}>5명 이상부터 집계됩니다</div>
    );
  }

  console.log(respodentsDetail);

  const respondentsIcon = () => {
    const femaleGroup = respodentsDetail["female"];
    for (const item in femaleGroup) {
      console.log(item);
    }

    return 1;
  };

  return (
    <>
      <div className={classes.groupParticipants}>
        {respondentsIcon()}
        {/* {genderGroup === "female" ? (
          <Image src={FemaleIcon} alt="femaleIcon" width={17} height={17} />
        ) : genderGroup === "male" ? (
          <Image src={MaleIcon} alt="maleIcon" width={17} height={17} />
        ) : (
          ""
        )} */}

        {/* {ageGroup && `${ageGroup}대`} */}

        {/* <>
          <span
            className={genderGroup === "male" ? classes.male : classes.female}
          >
            {genderGroup === "male" ? "남성" : "여성"}
          </span>
          의 참여율이 가장 높습니다.
        </> */}
      </div>
    </>
  );
};

export default GroupStatus;
