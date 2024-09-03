import { useGSAP } from "@gsap/react";
import classes from "./loading.module.scss";
import gsap from "gsap";
import { useRef } from "react";

export default function UiLoading() {
  const gsapRefs = useRef<HTMLDivElement[]>([]);
  useGSAP(() => {
    const tl = gsap.timeline({ repeat: -1 });
    tl.set(gsapRefs.current, { autoAlpha: 0 });
    // 첫 번째 애니메이션: y = 20으로 이동
    tl.to(gsapRefs.current, {
      autoAlpha: 1,
      y: 20,
      duration: 0.5,
      stagger: 0.1,
      ease: "sine.inOut",
    })
      // 두 번째 애니메이션: y = 0으로 복귀, 첫 번째 애니메이션이 끝나기 전에 시작
      .to(
        gsapRefs.current,
        {
          y: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: "sine.inOut",
        },
        "-=0.3"
      ); // 약간의 겹침을 주어 부드럽게 연결
  });

  const dotLength = Array.from({ length: 5 }).fill(null);

  return (
    <div className={classes.uiLoadingWrap}>
      {dotLength.map((_, idx) => (
        <div
          key={idx}
          className={classes.dot}
          ref={(el) => {
            if (el) {
              gsapRefs.current.push(el as HTMLDivElement);
            }
          }}
        />
      ))}
      <p>UI 불러오는 중</p>
    </div>
  );
}
