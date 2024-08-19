"use client";

import { useState } from "react";
import classes from "./surveyControler.module.scss";
import { useRouter, useSearchParams } from "next/navigation";
import { LIST_SORT } from "@/types/constans";

const btnArr = [
  {
    label: "전체보기",
    value: LIST_SORT.ALL,
  },
  {
    label: "참여자 높은 순",
    value: LIST_SORT.USER,
  },
  {
    label: "남자 선호가 높은",
    value: LIST_SORT.MALE,
  },
  {
    label: "여자 선호가 높은",
    value: LIST_SORT.FEMALE,
  },
];

export default function SurveyControler() {
  const router = useRouter();
  const queryString = useSearchParams();

  const [active, setActive] = useState(() => {
    return queryString.get("sort") || "all";
  });

  const onClickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    setActive(e.currentTarget.value);
    router.push(`/template?sort=${e.currentTarget.value}`);
  };

  return (
    <>
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
            {btn.label}
          </button>
        );
      })}
    </>
  );
}
