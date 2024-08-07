import { SurveyItemProps } from "@/types/survey";
import classes from "./SurveyItem.module.scss";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ForwardedRef, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function SurveyItem({
  itemData,
}: {
  itemData: SurveyItemProps;
  refs?: ForwardedRef<HTMLDivElement[]>;
}) {
  const {
    id,
    title,
    createUser,
    img,
    ParticipationCnt,
    ParticipationMain,
    template,
  } = itemData;
  const router = useRouter();
  const ref = useRef<HTMLDivElement>(null);

  const gsapRef = useRef<gsap.core.Timeline | null>(null);

  const onClickHandler = (e: Pick<SurveyItemProps, "id">["id"]) => {
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

  const gender = ParticipationMain.gender;

  return (
    <div
      className={`tdd ${classes.surveyBox}`}
      onClick={() => onClickHandler(id)}
      onMouseOver={onMouseHandler}
      onMouseLeave={onMouseReaver}
      ref={ref}
    >
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
      {/* <Image src={img} fill /> */}
      <div className={classes.surveySummary}>
        <div className={classes.surveyTitle}>{title}</div>
        <div className={classes.groupParticipants}>
          {ParticipationMain.ageRange}대{" "}
          <span className={gender === "men" ? classes.male : classes.female}>
            {gender === "men" ? "남자" : "여자"}
          </span>
          의 참여율이 가장 높습니다.
        </div>
        <div className={classes.bottomWrap}>
          <span className={classes.createUser}>by {createUser.username}</span>
          <span className={classes.Participation}>
            참여자 {ParticipationCnt}명
          </span>
        </div>
      </div>
    </div>
  );
}
