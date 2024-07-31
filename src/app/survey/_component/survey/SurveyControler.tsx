"use client";

import { useState } from "react";
import classes from "./surveyControler.module.scss";

const btnArr = [
  {
    label: "전체보기",
    value: "all",
  },
  {
    label: "참여자 높은 순",
    value: "e",
  },
  {
    label: "좋아요 높은 순",
    value: "e",
  },
  {
    label: "남자 선호가 높은",
    value: "e",
  },
  {
    label: "여자 선호가 높은",
    value: "e",
  },
];

export default function SurveyControler() {
  const [active, setActive] = useState("all");

  const onClickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    setActive(e.currentTarget.value);
  };

  return (
    <>
      {btnArr.map((btn) => {
        return (
          <>
            <button
              className={`${active === btn.value ? classes.active : ""} ${
                classes.btnControler
              }`}
              value={btn.value}
              onClick={onClickHandler}
            >
              {btn.label}
            </button>
          </>
        );
      })}
    </>
  );
}
