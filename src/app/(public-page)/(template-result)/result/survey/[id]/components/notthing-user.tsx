import { ageGroupProps } from "@/types/template";
import { GenderOptions } from "./SurveyGroupFilter";

export default function NotthingUser({
  ageGroup,
  genderGroup,
}: {
  ageGroup: ageGroupProps;
  genderGroup: GenderOptions;
}) {
  const getGenderText = (gender: string) => {
    if (gender === "all") {
      return null;
    }
    return gender === "female" ? "여성" : "남성";
  };

  return (
    <>
      <div className="border p-4 rounded-md">
        <div className="text-sm p-8">
          {ageGroup && `${ageGroup}대`} {getGenderText(genderGroup)} 참여자가
          없어요!
        </div>
      </div>
    </>
  );
}
