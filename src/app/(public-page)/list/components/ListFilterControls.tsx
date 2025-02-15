"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import FemaleIcon from "/public/asset/icon/female.svg";
import MaleIcon from "/public/asset/icon/male.svg";
// import GraphIcon from "/public/asset/icon/graph.svg";

import classes from "./ListFilterControls.module.scss";
import { TEMPLATERLIST_SORT } from "@/types/template.type";
import TabRounded from "@/components/ui/tab-rounded";

const btnArr = [
  {
    label: "최신 순",
    value: TEMPLATERLIST_SORT.ALL,
  },
  {
    label: "참여자 순",
    value: TEMPLATERLIST_SORT.RESPONDENTS,
  },
  {
    label: "남성 선호도",
    value: TEMPLATERLIST_SORT.MALE,
  },
  {
    label: "여성 선호도",
    value: TEMPLATERLIST_SORT.FEMALE,
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

  const onClickHandler = (e: TEMPLATERLIST_SORT) => {
    const newParams = new URLSearchParams(qs.toString());
    newParams.set("sort", e);
    newParams.delete("page");
    setActive(e);
    router.push(`/list?${newParams.toString()}`, { scroll: false });
  };

  return (
    <div className={classes.btnWrapper}>
      {btnArr.map((btn, idx) => {
        return (
          <TabRounded
            active={active === btn.value}
            onClick={() => onClickHandler(btn.value)}
            key={`btn-${idx}`}
          >
            {btn.label}
          </TabRounded>
        );
      })}
    </div>
  );
}
