"use client";

import { useEffect, useState } from "react";
import classes from "./surveyControler.module.scss";
import { useRouter, useSearchParams } from "next/navigation";
import { LIST_SORT } from "@/types/constans";
import Image from "next/image";
import FemaleIcon from "/public/asset/icon/female.svg";

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

    router.push(`/template?${newParams.toString()}`);
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
            <FemaleIcon />
            {btn.label}
          </button>
        );
      })}
    </>
  );
}
