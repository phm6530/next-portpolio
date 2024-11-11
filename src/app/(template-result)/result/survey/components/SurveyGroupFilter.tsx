import InputTypeStyle from "@/app/template/_component/InputTypeStyle";
import classes from "./SurveyGroupFilter.module.scss";
import { Dispatch, SetStateAction, useState } from "react";
import { ageGroupProps } from "@/types/template";
const FILTER_GENDER = [
  {
    label: "전체보기",
    val: "all",
  },
  {
    label: "남자",
    val: "male",
  },
  {
    label: "여자",
    val: "female",
  },
];

const FILTER_Age = [
  {
    label: "전체보기",
    val: "all",
  },
  {
    label: "10대",
    val: 10,
  },
  {
    label: "20대",
    val: 20,
  },
  {
    label: "30대",
    val: 30,
  },
  {
    label: "40대",
    val: 40,
  },
  {
    label: "50대",
    val: 50,
  },
  {
    label: "60대",
    val: 60,
  },
] as const;

type test = typeof FILTER_Age;

export default function SurveyGroupFilter({
  setFilter,
}: {
  setFilter: Dispatch<
    SetStateAction<{
      genderGroup: string;
      ageGroup: string;
    }>
  >;
}) {
  const [genderGroup, setGenderGroup] = useState<string | null>(null);
  const [ageGroup, setAgeGroup] = useState<string | null>(null);

  console.log(genderGroup);

  // Gender Filter
  const filterGenderHandler = (btnVal: string) => {
    if (btnVal === "all" || btnVal === "female" || btnVal === "male") {
      setGenderGroup(btnVal);
    }
  };

  // Age Filter
  const filterAgeHandler = (btnVal: string) => {
    if (["all", "10", "20", "30", "40", "50", "60"].includes(btnVal)) {
      setAgeGroup(
        btnVal === "all"
          ? "all"
          : (parseInt(btnVal) as Exclude<ageGroupProps, "all">)
      );
    }
  };

  return (
    <div className={classes.radioWrap}>
      {/* Gender Filter */}
      <div className={classes.filterController}>
        {FILTER_GENDER.map((e, idx) => {
          return (
            <InputTypeStyle.RadioTab
              key={`genderFilter-${idx}`}
              select={genderGroup === e.val + ""}
              onClick={() => filterGenderHandler(e.val)}
            >
              {e.label}
            </InputTypeStyle.RadioTab>
          );
        })}
      </div>

      {/* Age Filter */}
      <div className={classes.filterController}>
        {FILTER_Age.map((e, idx) => {
          return (
            <InputTypeStyle.RadioTab
              key={`genderFilter-${idx}`}
              select={ageGroup + "" === e.val + ""}
              onClick={() => filterAgeHandler(e.val + "")}
            >
              {e.label}
            </InputTypeStyle.RadioTab>
          );
        })}
      </div>
    </div>
  );
}
