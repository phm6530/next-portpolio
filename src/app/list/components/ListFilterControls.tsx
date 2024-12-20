"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import FemaleIcon from "/public/asset/icon/female.svg";
import MaleIcon from "/public/asset/icon/male.svg";
// import GraphIcon from "/public/asset/icon/graph.svg";

import classes from "./ListFilterControls.module.scss";
import { TEMPLATERLIST_SORT } from "@/types/template.type";

const btnArr = [
  {
    label: "최신 순",
    value: TEMPLATERLIST_SORT.ALL,
  },
  {
    label: "참여자 순",
    value: TEMPLATERLIST_SORT.RESPONDENTS,
    icon: FemaleIcon,
  },
  {
    label: "남성 선호도",
    value: TEMPLATERLIST_SORT.MALE,
    icon: MaleIcon,
  },
  {
    label: "여성 선호도",
    value: TEMPLATERLIST_SORT.FEMALE,
    icon: FemaleIcon,
  },
];

export default function ListFilterControls() {
  const qs = useSearchParams();

  const router = useRouter();
  const sortValue = qs.get("sort") || "all";
  const [active, setActive] = useState(sortValue || "all");

  useEffect(() => {
    setActive(sortValue);
  }, [qs, sortValue]);

  const onClickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    const newSortValue = e.currentTarget.value;

    const newParams = new URLSearchParams(qs.toString()); // 쿼리 파라미터 복사
    newParams.set("sort", newSortValue);
    newParams.delete("page");
    setActive(newSortValue);

    router.push(`/list?${newParams.toString()}`, { scroll: false });
  };

  return (
    <div className={classes.btnWrapper}>
      {btnArr.map((btn, idx) => {
        return (
          <button
            key={`btn-${idx}`}
            className={`${active === btn.value ? classes.active : ""} ${
              classes.btnControler
            }`}
            value={btn.value}
            onClick={onClickHandler}
          >
            {/* {btn.icon && <btn.icon className={classes.btnImg} />} */}
            <span>{btn.label}</span>
          </button>
        );
      })}
    </div>
  );
}
