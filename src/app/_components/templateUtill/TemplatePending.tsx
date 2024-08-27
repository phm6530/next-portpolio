"use client";
import Image from "next/image";
import classes from "./TemplateComponent.module.scss";
import { useRouter } from "next/navigation";

export default function TemplatePending({
  dateRange,
  thumbnail,
  title,
  templateStatus,
}: {
  dateRange: [string, string];
  thumbnail: string | null;
  title: string;
  templateStatus: "pending" | "after";
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
      <h1>{title}</h1>
      <p>
        기간 : {dateRange[0]} - {dateRange[1]}
      </p>
      <p>{templateStatus === "pending" && "아직 진행 날이 아닙니다.."}</p>
      <p>{templateStatus === "after" && "종료되었습니다."}</p>
      {templateStatus === "after" && (
        <>
          <button>결과보기</button>
        </>
      )}
      <button onClick={() => router.replace("/template")}>
        리스트로 돌아가기
      </button>
    </>
  );
}
