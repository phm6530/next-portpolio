"use client";

import girlCractor from "/public/asset/girl_template.png";
import Image from "next/image";
import classes from "./Creactor.module.scss";
import AgeGroupIcon from "@/app/_components/Cractor/genarationIcon/AgeGroupIcon";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import gsap from "gsap";

export default function TemplateCractor() {
  const ref = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      if (ref.current) {
        const icons = ref.current.querySelectorAll(".icon");
        const carector = ref.current.querySelectorAll(".carector");

        gsap.set(icons, { autoAlpha: 1 });

        // 메인 타임라인
        const mainTimeline = gsap.timeline();

        // 캐릭터 애니메이션
        mainTimeline.from(carector, {
          x: 50,
          opacity: 0,
          ease: "power3.inOut", // 원하는 애니메이션 설정
          direction: 5,
          delay: 0.3,
        });

        // 내부 icon 애니메이션
        let delay = 0.3;
        icons.forEach((icon) => {
          // 각 아이콘에 대한 개별 타임라인
          const iconTimeline = gsap.timeline();

          iconTimeline
            .from(icon, {
              duration: 1,
              opacity: 0,
              y: 200,
              scale: 0,
              delay: delay, // 개별 delay
              ease: "back.inOut",
            })
            .to(icon, {
              y: 10,
              yoyo: true,
              ease: "sine",
              repeat: -1,
              duration: 1,
            });

          delay += 0.2; // 다음 아이콘의 delay 조정
        });
      }
    },
    { scope: ref }
  );

  return (
    <>
      <div className={classes.templateCreactorWrap} ref={ref}>
        <div className={`${classes.ageGroup10}  icon`}>
          <AgeGroupIcon ageGroup={10} size={"extraLarge"} />
        </div>
        <div className={`${classes.ageGroup20}  icon`}>
          <AgeGroupIcon ageGroup={20} size={"small"} gender="female" />
        </div>
        <div className={`${classes.ageGroup30}  icon`}>
          <AgeGroupIcon ageGroup={30} size={"large"} />
        </div>
        <div className={`${classes.ageGroup40}  icon`}>
          <AgeGroupIcon ageGroup={40} size={"small"} gender="male" />
        </div>
        <div className={`${classes.ageGroup50}  icon`}>
          <AgeGroupIcon ageGroup={50} size={"small"} />
        </div>
        <div className={`${classes.CreactorWrap} carector`}>
          <Image src={girlCractor} alt="girlCractor" priority />
        </div>
      </div>
    </>
  );
}
