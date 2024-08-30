import { ReactNode } from "react";
import classes from "./ErrorComponent.module.scss";
import NotSearch from "/public/asset/icon/notFoundsearch.png";
import Image from "next/image";
import { metadata } from "@/app/template/page";

function NotFoundSearch({ keyword }: { keyword: string }) {
  return (
    <div className={classes.errorDefault}>
      <div className={classes.iconWrap}>
        <Image src={NotSearch} alt="gg" width={50} />
      </div>
      <span>&apos;{keyword}&apos;</span> 일치하는 검색어가 없습니다.
    </div>
  );
}

function ErrorComponent({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

ErrorComponent.NotFoundSearch = NotFoundSearch;

export default ErrorComponent;
