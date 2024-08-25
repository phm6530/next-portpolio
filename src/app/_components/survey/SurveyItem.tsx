import { GetTemplateDetail, GetTemplateItemProps } from "@/types/template";
import { useRouter } from "next/navigation";
import { ForwardedRef, useRef } from "react";
import { useGSAP } from "@gsap/react";

import classes from "./SurveyItem.module.scss";
import Image from "next/image";
import gsap from "gsap";

import TemplateStatus from "@/app/_components/templateUtill/TemplateStatus";
import helperDateCompare from "@/app/lib/helperDateCompare";

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
    template,
    age_group,
    gender_group,
    user_cnt,
    dateRange,
    thumbnail,
  } = itemData;

  console.log(thumbnail);

  const router = useRouter();
  const ref = useRef<HTMLDivElement>(null);
  const gsapRef = useRef<gsap.core.Timeline | null>(null);
  const dayCompare = helperDateCompare();

  const onClickHandler = (e: GetTemplateItemProps["id"]) => {
    if (dateRange.every((e) => e !== null)) {
      const [start, end] = dateRange;
      if (dayCompare.isBefore(start)) {
        alert("아직 시작 전인데요..");
        return;
      }
      if (dayCompare.isAfter(end)) {
        if (
          confirm("해당 설문조사는 종료 되었습니다. 결과페이지로 가시겠습니까?")
        ) {
          router.push(`/template/result/${id}`);
        }
        return;
      }
    }

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

  // 절대경로 파악
  const isAbsolutePath = (imgUrl: string) => {
    if (/^(https?:)?\/\//.test(imgUrl)) {
      return imgUrl;
    } else {
      console.log(`${process.env.NEXT_PUBLIC_BASE_URL}/${imgUrl}`);
      return `${process.env.NEXT_PUBLIC_BASE_URL}/${imgUrl}`;
    }
  };

  return (
    <div
      className={`tdd ${classes.surveyBox}`}
      onClick={() => onClickHandler(id)}
      onMouseOver={onMouseHandler}
      onMouseLeave={onMouseReaver}
      ref={ref}
    >
      {thumbnail && (
        <div className={classes.surveyThumbNail}>
          <Image
            alt="test"
            src={isAbsolutePath(thumbnail)}
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            fill
            style={{ objectFit: "cover" }}
          />
        </div>
      )}
      {/* <Image src={img} fill /> */}
      <div className={classes.surveySummary}>
        {/* 템플릿 상태 보여주기 */}
        <TemplateStatus dateRange={dateRange} />
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
