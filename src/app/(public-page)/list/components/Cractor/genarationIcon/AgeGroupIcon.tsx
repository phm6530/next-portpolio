import AgeGroup from "/public/asset/icon/person_6.png";
import Image from "next/image";
import Male from "/public/asset/3d/male.png";
import Female from "/public/asset/3d/female.png";
import { cn } from "@/lib/utils";

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
      className={cn(
        "absolute rounded-full  default_icon talkShape min-w-[105px]  bg-white flex items-center mb-6",
        size &&
          (() => {
            switch (size) {
              case "small":
                return "py-4 px-5 text-sm ";
              case "large":
                return "py-4 px-6 text-base";
              case "extraLarge":
                return "py-4 px-7 text-lg";
            }
          })(),
        gender &&
          (() => {
            switch (gender) {
              case "male":
                return "male_icon";
              case "female":
                return "female_icon";
            }
          })()
      )}
    >
      <div className="relative w-7 h-7 mr-2  bg-zinc-600/10 rounded-full">
        {gender === "female" ? (
          <Image
            src={Female}
            alt="icon"
            width={40}
            height={50}
            className="scale-130"
          />
        ) : (
          <Image
            src={Male}
            alt="icon"
            width={40}
            height={50}
            className="scale-140"
          />
        )}
      </div>
      <div
        className={cn(" flex gap-1", gender ? "!text-white" : "text-zinc-700")}
      >
        {ageGroup} <span>대</span>
      </div>
    </div>
  );
}
