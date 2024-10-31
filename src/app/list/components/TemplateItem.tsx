"use client";
import { TemplateItemMetadata } from "@/types/template.type";
import classes from "./templateItem.module.scss";
import Image from "next/image";
import imgUrlMapper from "@/util/imgUrlMapper";
import TemplateStatus from "@/components/templateUtill/TemplateStatus";
import GroupStatus from "@/components/ui/GroupStatus";
import { useRouter } from "next/navigation";

export default function TemplateItem({
  id,
  title,
  description,
  templateType,
  createdAt,
  startDate,
  endDate,
  thumbnail,
  respondents,
  ...rest
}: TemplateItemMetadata) {
  const router = useRouter();

  //참여자
  const { allCnt, detail } = respondents;

  return (
    <div
      className={`tdd ${classes.templateItemContainer}`}
      onClick={() => router.push(`/${templateType}/${id}`)}
    >
      {thumbnail && (
        <div className={classes.templateItemThumbNail}>
          <div className={classes.templateType}>{templateType}</div>
          <Image
            alt="test"
            // sizes=" 100vw"
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 50vw, 33vw"
            // unoptimized
            fill
            src={imgUrlMapper({ thumbnail })}
            priority
            // fill
            style={{ objectFit: "cover" }}
          />
        </div>
      )}

      {/* <Image src={img} fill /> */}
      <div className={classes.templateItemSummary}>
        {/* 상태 icons.. */}
        <TemplateStatus
          startDate={startDate}
          endDate={endDate}
          createdAt={createdAt}
        />
        {/* 템플릿 상태 보여주기 */}
        <div className={classes.templateItemTitle}>{title}</div>
        <div>{description}</div>
        <div>{createdAt}</div>

        <GroupStatus {...rest} detail={detail} action={allCnt < 5} />

        <div className={classes.bottomWrap}>
          <span className={classes.Participation}>참여자 {allCnt || 0}명</span>
        </div>
      </div>
    </div>
  );
}