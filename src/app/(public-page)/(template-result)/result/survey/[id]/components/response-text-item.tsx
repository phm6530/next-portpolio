import { cn } from "@/lib/utils";
import { ageGroupProps } from "@/types/template";
import { GENDER_GROUP } from "@/types/user";
import Image from "next/image";
import Male from "/public/asset/3d/male.png";
import Female from "/public/asset/3d/female.png";

export default function ResponseTextItem({
  responserGender,
  responserAge,
  answer,
}: {
  responserGender: GENDER_GROUP;
  responserAge: ageGroupProps;
  answer: string;
}) {
  return (
    <div className=" p-3 bg-third rounded-xl  hover:border-primary">
      <div className="flex items-center gap-2">
        <div className=" w-10 h-10 border-foreground/30  border-2 rounded-full flex relative  flex-col overflow-hidden [&>svg]:w-5 [&>svg]:h-5 [&>svg]:fill-[#000000] dark:[&>svg]:fill-[#ffffff] ">
          {responserGender === "female" && (
            <Image
              src={Female}
              alt="logo"
              fill
              priority
              style={{ objectFit: "contain" }}
              sizes="(max-width: 768px) 50vw"
            />
          )}

          {responserGender === "male" && (
            <Image
              src={Male}
              alt="logo"
              fill
              priority
              style={{ objectFit: "contain" }}
              sizes="(max-width: 768px) 50vw"
            />
          )}
        </div>

        <div className="text-[13px]">{responserAge} 대 </div>
        <span
          className={cn(
            "text-sm",
            responserGender === "female" ? "text-pink-400" : "text-blue-300"
          )}
        >
          {responserGender === "female" ? "여성" : "남성"}
        </span>
      </div>

      <div className="rounded-md  mt-3 text-foreground text-sm leading-6">
        {answer}
      </div>
    </div>
  );
}
