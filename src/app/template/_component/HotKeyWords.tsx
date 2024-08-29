"use client";

import classes from "./HotKeywords.module.scss";
import { useRouter } from "next/navigation";

export default function HotKeyword() {
  const hotKeywords = ["선물", "연애", "평균연봉", "키", "받고싶은 선물"];

  const router = useRouter();

  return (
    <div className={classes.HotKeywordWrap}>
      <span className={classes.subTitle}>인기검색어</span>
      <div className={classes.keyWordWrap}>
        {hotKeywords.map((e, idx) => {
          return (
            <span
              className={classes.keyWord}
              key={idx}
              onClick={() =>
                router.push(`/template?search=${e}`, { scroll: false })
              }
            >
              {e}
            </span>
          );
        })}
      </div>
    </div>
  );
}
