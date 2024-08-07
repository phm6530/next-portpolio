import { templateItemProps } from "@/types/template";
import classes from "./SurveyItem.module.scss";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ForwardedRef, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function SurveyItem({
  itemData,
}: {
  itemData: templateItemProps;
  refs?: ForwardedRef<HTMLDivElement[]>;
}) {
  const { id, title, description, created_at, img, template } = itemData;
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
        <div className={classes.surveyTitle}>{title}</div>
        <div>{description}</div>
        <div>{created_at}</div>
        {/* <div className={classes.groupParticipants}>
          {ParticipationMain && ParticipationMain.ageRange}대{" "}
          <span
            className={
              ParticipationMain.gender === "men" ? classes.male : classes.female
            }
          >
            {ParticipationMain && ParticipationMain.gender === "men"
              ? "남자"
              : "여자"}
          </span>
          의 참여율이 가장 높습니다.
        </div> */}
        {/* <div className={classes.bottomWrap}>
          <span className={classes.createUser}>by {createUser.username}</span>
          <span className={classes.Participation}>
            참여자 {ParticipationCnt}명
          </span>
        </div> */}
      </div>
    </div>
  );
}
