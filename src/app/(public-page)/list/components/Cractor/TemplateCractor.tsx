"use client";

import girlCractor from "/public/asset/girl_template.png";
import Image from "next/image";
import AgeGroupIcon from "./genarationIcon/AgeGroupIcon";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import gsap from "gsap";

export default function TemplateCractor() {
  const ref = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      if (ref.current) {
        const icons = ref.current.querySelectorAll(".icon");

        // 메인 타임라인
        const mainTimeline = gsap.timeline();

        // 캐릭터 애니메이션
        mainTimeline.from(ref.current, {
          autoAlpha: 0,
          x: 50,
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
              autoAlpha: 0,
              duration: 1,
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
      <div
        className="relative w-[240px]  md:w-[290px] mt-4 aspect-[3/4] invisible"
        ref={ref}
      >
        <div className={`top-[41%] right-[34%] z-30  absolute invisible icon`}>
          <AgeGroupIcon ageGroup={10} size={"extraLarge"} />
        </div>
        <div className={`top-[25%] right-[15%] z-20  absolute invisible  icon`}>
          <AgeGroupIcon ageGroup={20} size={"small"} gender="female" />
        </div>
        <div
          className={`top-[70%] right-[106%] z-10  absolute invisible  icon`}
        >
          <AgeGroupIcon ageGroup={30} size={"large"} />
        </div>
        <div className={`top-[50%] right-[120%] z-0  absolute invisible  icon`}>
          <AgeGroupIcon ageGroup={40} size={"small"} gender="female" />
        </div>
        <div className={`top-[13%] right-[50%] z-0  absolute invisible  icon`}>
          <AgeGroupIcon ageGroup={50} size={"small"} gender="male" />
        </div>

        <Image src={girlCractor} alt="girlCractor" priority fill />
      </div>
    </>
  );
}
