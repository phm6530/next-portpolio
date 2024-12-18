import {
  Gender,
  GetTemplateDetail,
  GetTemplateItemProps,
} from "@/types/template";
import { useRouter } from "next/navigation";
import { ForwardedRef, useRef } from "react";
import { useGSAP } from "@gsap/react";

import classes from "./SurveyItem.module.scss";
import Image from "next/image";
import gsap from "gsap";

import TemplateStatus from "@/components/templateUtill/TemplateStatus";
import FemaleIcon from "/public/asset/icon/mdi_face-female.png";
import MaleIcon from "/public/asset/icon/mdi_face-male.png";
import imgUrlMapper from "@/util/imgUrlMapper";
import GroupStatus from "@/components/ui/GroupStatus";

export default function SurveyItem({ itemData, }: {
  itemData: GetTemplateDetail;
  refs?: ForwardedRef<HTMLDivElement[]>;
}) {
  const {
    id,
    title,
    description,
    created_at,
    template: templateType,
    age_group,
    gender_group,
    user_cnt,
    dateRange,
    thumbnail,
    user_id,
  } = itemData;

  const router = useRouter();
  const ref = useRef<HTMLDivElement>(null);
  const gsapRef = useRef<gsap.core.Timeline | null>(null);

  const onClickHandler = async (e: GetTemplateItemProps["id"]) => {
    // const session = await getSession();

    // //어드민은 다 진입 가능
    // if (
    //   !(session?.user.user_id === user_id || session?.user.role === "admin")
    // ) {
    //   if (dateRange.every((e) => e !== null)) {
    //     const [start, end] = dateRange;
    //     if (dayCompare.isBefore(start)) {
    //       alert("아직 시작 전인데요..");
    //       return;
    //     }
    //     if (dayCompare.isAfter(end)) {
    //       if (
    //         confirm(
    //           "해당 설문조사는 종료 되었습니다. 결과페이지로 가시겠습니까?"
    //         )
    //       ) {
    //         router.push(`/template/result/${id}`);
    //       }
    //       return;
    //     }
    //   }
    // }
    router.push(`/template/${templateType}/${e}`);
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
      {thumbnail && (
        <div className={classes.surveyThumbNail}>
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
      <div className={classes.surveySummary}>
        {" "}
        <TemplateStatus dateRange={dateRange} createdAt={created_at} />
        {/* 템플릿 상태 보여주기 */}
        <div className={classes.surveyTitle}>{title}</div>
        {/* <div>{description}</div> */}
        {/* <div>{created_at}</div> */}
        <GroupStatus
          genderGroup={gender_group as Gender}
          ageGroup={age_group as string}
          action={user_cnt < 5}
        />
        <div className={classes.bottomWrap}>
          <span className={classes.Participation}>
            참여자 {user_cnt || 0}명
          </span>
        </div>
      </div>
    </div>
  );
}
