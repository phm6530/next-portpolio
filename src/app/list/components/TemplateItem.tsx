"use client";
import {
  RespondentsAndMaxGroup,
  TemplateItemMetadata,
} from "@/types/template.type";
import classes from "./templateItem.module.scss";
import Image from "next/image";
import imgUrlMapper from "@/util/imgUrlMapper";
import TemplateStatus from "@/components/templateUtill/TemplateStatus";
import { useRouter } from "next/navigation";
import { ForwardedRef, forwardRef } from "react";
import TransformPlainText from "@/components/TransformPlainText";

const TemplateItem = forwardRef(
  (
    {
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
    }: TemplateItemMetadata<RespondentsAndMaxGroup>,
    ref?: ForwardedRef<HTMLDivElement>
  ) => {
    //참여자
    const { allCnt, maxGroup } = respondents;

    const router = useRouter();

    return (
      <div
        className={`tdd ${classes.templateItemContainer}`}
        onClick={() => router.push(`/${templateType}/${id}`)}
        ref={ref}
      >
        {thumbnail && (
          <div className={classes.templateItemThumbNail}>
            <div className={classes.templateType}>{templateType}</div>
            <Image
              alt="test"
              // sizes=" 100vw"
              sizes="(max-width: 768px) 50vw, (max-width: 1200px) 50vw, 33vw"
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
            maxGroup={maxGroup}
          />

          {/* 템플릿 정보 보여주기 */}
          <div className={classes.summary}>
            <div className={classes.title}>{title}</div>
            {/* <QuillViewer contents={description}/> */}

            <div className={classes.description}>
              <TransformPlainText html={description} />
            </div>
            {/* <div className={classes.bottomWrap}>
              <span className={classes.Participation}>
                참여자 {allCnt || 0}명
              </span>
            </div> */}
            {/* 선호 */}
            {/* {allCnt >= 1 && <GroupStatus {...rest} maxGroup={maxGroup} />} */}
          </div>

          {/* 선호 그룹은 10명이상일때만 생성하기 */}

          {/* <div className={classes.gnederChart}>
            <div className={classes.male}></div>
            <div className={classes.female}></div>
          </div> */}

          <div className={classes.btnWrapper}>
            <button>참여하기</button>
            <button>결과보기</button>
          </div>
        </div>
      </div>
    );
  }
);

// 명시적으로 기재 안까먹기
TemplateItem.displayName = "TemplateItem";

export default TemplateItem;
