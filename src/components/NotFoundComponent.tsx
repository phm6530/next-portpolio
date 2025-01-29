import { ReactNode } from "react";
import classes from "./NotFoundComponent.module.scss";

function search({ keyword }: { keyword: string }) {
  return (
    <div className={classes.errorDefault}>
      <div className={classes.iconWrap}>
        {/* <Image src={NotSearch} alt="searchIcon" width={50} /> */}
      </div>
      <span>&apos;{keyword}&apos;</span> 일치하는 검색어가 없습니다.
    </div>
  );
}

function reply() {
  return (
    <div className={classes.errorDefault}>
      <div className={classes.iconWrap}>
        {/* <Image src={replyIcon} alt="replyIcon" width={70} /> */}
      </div>
      아직 등록된 댓글이 없습니다
    </div>
  );
}

function noneData({
  text = "아직 등록된 댓글이 없습니다",
}: {
  text?: string;
}) {
  return (
    <div className={classes.errorDefault}>
      <div className={classes.iconWrap}>
        {/* <Image src={replyIcon} alt="replyIcon" width={70} /> */}
      </div>
      {text}
    </div>
  );
}

function NotFoundComponent({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

NotFoundComponent.search = search;
NotFoundComponent.reply = reply;
NotFoundComponent.noneData = noneData;

export default NotFoundComponent;
