"use client";
import Image from "next/image";
import classes from "./TemplateComponent.module.scss";
import { useRouter } from "next/navigation";
import { ageGroupProps, Gender, TemplateTypeProps } from "@/types/template";
import Button from "@/components/ui/button/Button";

export default function TemplatePending({
  dateRange,
  thumbnail,
  description,
  title,
  templateStatus,
  templateType,
  templateId,
  ageGroup,
  genderGroup,
  userCnt,
}: {
  dateRange: [string, string];
  thumbnail: string | null;
  description: string;
  title: string;
  templateStatus: "pending" | "after";
  templateType: TemplateTypeProps;
  templateId: string;
  ageGroup: ageGroupProps;
  genderGroup: Gender;
  userCnt: number;
}) {
  const router = useRouter();

  return (
    <>
      {thumbnail && (
        <div className={classes.ImgWrap}>
          <Image
            src={thumbnail}
            alt="thumbnail"
            fill
            style={{ objectFit: "cover" }}
          />
        </div>
      )}
      <div className={classes.summry}>
        <h1>{title}</h1>
        <p className={classes.description}>{description}</p>
        <br></br>
        <div className={classes.statusText}>
          {templateStatus === "after" && (
            <>
              해당 설문조사는 <span>종료</span> 되었습니다
            </>
          )}
          {templateStatus === "pending" && (
            <>
              아직 <span>시작 전</span>이네요..
            </>
          )}
        </div>

        {/* <GroupStatus
          genderGroup={genderGroup as Gender}
          ageGroup={ageGroup as string}
          action={userCnt < 5}
        /> */}
        <div className={classes.dateRange}>
          참여기간 : {dateRange[0]} - {dateRange[1]}
        </div>
        <div style={{ display: "flex", gap: "10px" }}>
          {templateStatus === "after" && (
            <>
              <Button.submit
                onClick={() => router.push(`/template/result/${templateId}`)}
              >
                결과보기
              </Button.submit>
            </>
          )}
          <button
            className={classes.back}
            onClick={() => router.replace("/template")}
          >
            돌아가기
          </button>
        </div>
      </div>
    </>
  );
}
