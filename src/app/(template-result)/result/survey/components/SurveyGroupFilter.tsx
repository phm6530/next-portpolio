import InputTypeStyle from "@/app/template/_component/InputTypeStyle";
import classes from "./SurveyGroupFilter.module.scss";
import { useState } from "react";
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

export default function SurveyGroupFilter() {
  const [genderGroup, setGenderGroup] = useState<string | null>(null);
  const [ageGroup, setAgeGroup] = useState<string | null>(null);

  return (
    <div className={classes.radioWrap}>
      {/* Gender Filter */}
      <div className={classes.filterController}>
        {FILTER_GENDER.map((e, idx) => {
          return (
            <InputTypeStyle.RadioTab
              key={`genderFilter-${idx}`}
              select={genderGroup === e.val + ""}
              //   onClick={() => filterGenderHandler(e.val)}
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
              //   onClick={() => filterAgeHandler(e.val + "")}
            >
              {e.label}
            </InputTypeStyle.RadioTab>
          );
        })}
      </div>
    </div>
  );
}
