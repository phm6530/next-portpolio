import Link from "next/link";
import classes from "./HotKeywords.module.scss";

export default function HotKeyword() {
  const hotKeywords = ["선물", "연애", "평균연봉", "키"];

  return (
    <div className={classes.HotKeywordWrap}>
      <span>인기검색어</span>
      <div>
        {hotKeywords.map((e, idx) => {
          return (
            <Link
              href={`/survey?search=${e}`}
              className="hotKeywordList"
              key={idx}
            >
              {e}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
