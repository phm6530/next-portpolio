import { GetTemplateDetail, templateItemProps } from "@/types/template";
import { useRouter } from "next/navigation";
import { ForwardedRef, useRef } from "react";
import { useGSAP } from "@gsap/react";

import classes from "./SurveyItem.module.scss";
import Image from "next/image";
import gsap from "gsap";
import dayjs from "dayjs";

export default function SurveyItem({
  itemData,
}: {
  itemData: GetTemplateDetail;
  refs?: ForwardedRef<HTMLDivElement[]>;
}) {
  const {
    id,
    title,
    description,
    created_at,
    img,
    template,
    age_group,
    gender_group,
    user_cnt,
    dateRange,
  } = itemData;

  const router = useRouter();
  const ref = useRef<HTMLDivElement>(null);
  const gsapRef = useRef<gsap.core.Timeline | null>(null);

  const onClickHandler = (e: Pick<templateItemProps, "id">["id"]) => {
    router.push(`/template/${template}/${e}`);
  };

  const { contextSafe } = useGSAP(
    () => {
      const tl = gsap.timeline({ paused: true });
      tl.to(ref.current, {
        scale: 1.1,
        ease: "power4.inOut",
      });

      gsapRef.current = tl;
    },
    { scope: ref }
  );

  const onMouseHandler = contextSafe(() => {
    gsapRef.current?.play();
  });

  const onMouseReaver = contextSafe(() => {
    gsapRef.current?.reverse();
  });

  // dateRange[0];
  const today = dayjs(); // 현재 날짜 생성

  return (
    <div
      className={`tdd ${classes.surveyBox}`}
      onClick={() => onClickHandler(id)}
      onMouseOver={onMouseHandler}
      onMouseLeave={onMouseReaver}
      ref={ref}
    >
      {img && (
        <div className={classes.surveyThumbNail}>
          <Image
            alt="test"
            src={img}
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            fill
            style={{ objectFit: "cover" }}
          />
        </div>
      )}
      {/* <Image src={img} fill /> */}
      <div className={classes.surveySummary}>
        <div>
          {dateRange.some((e) => e === null)
            ? "기한 없음"
            : today.isBefore(dateRange[0], "day")
            ? "진행전"
            : today.isAfter(dateRange[1], "day")
            ? "종료"
            : "진행 중"}
          <div>
            {dateRange[0]} = {dateRange[1]}
          </div>
        </div>
        <div className={classes.surveyTitle}>{title}</div>
        <div>{description}</div>
        <div>{created_at}</div>

        <div className={classes.groupParticipants}>
          {age_group && `${age_group}대`}

          {gender_group ? (
            <>
              <span
                className={
                  gender_group === "male" ? classes.male : classes.female
                }
              >
                {gender_group === "male" ? "남성" : "여성"}
              </span>
              의 참여율이 가장 높습니다.
            </>
          ) : (
            user_cnt < 10 && "참여해주세요!"
          )}
        </div>

        <div className={classes.bottomWrap}>
          <span className={classes.Participation}>
            참여자 {user_cnt || 0}명
          </span>
        </div>
      </div>
    </div>
  );
}
