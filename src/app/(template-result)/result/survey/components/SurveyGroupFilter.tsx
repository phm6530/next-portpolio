import InputTypeStyle from "@/app/template/_component/InputTypeStyle";
import classes from "./SurveyGroupFilter.module.scss";
import { Dispatch, SetStateAction, useState } from "react";

import {
  FILTER_AGE,
  FILTER_GENDER,
} from "@/app/(template-result)/result/survey/components/SurveyGroupFilter.tab";

export type GenderOptions = (typeof FILTER_GENDER)[number]["val"];
export type AgeOptions = (typeof FILTER_AGE)[number]["val"];

export default function SurveyGroupFilter({
  curFilter,
  setFilter,
}: {
  curFilter: {
    genderGroup: GenderOptions;
    ageGroup: AgeOptions;
  };
  setFilter: Dispatch<
    SetStateAction<{
      genderGroup: GenderOptions;
      ageGroup: AgeOptions;
    }>
  >;
}) {
  // Gender Filter
  const filterGenderHandler = (btnVal: GenderOptions) => {
    setFilter((prev) => {
      return { ...prev, genderGroup: btnVal };
    });
  };

  // Age Filter
  const filterAgeHandler = (btnVal: AgeOptions) => {
    setFilter((prev) => {
      return {
        ...prev,
        ageGroup:
          btnVal === "all" ? "all" : (btnVal as Exclude<AgeOptions, "all">),
      };
    });
  };

  return (
    <div className={classes.radioWrap}>
      {/* Gender Filter */}
      <div className={classes.filterController}>
        {FILTER_GENDER.map((e, idx) => (
          <InputTypeStyle.RadioTab
            key={`genderFilter-${idx}`}
            select={curFilter.genderGroup === e.val} // genderGroup과 정확히 비교
            onClick={() => filterGenderHandler(e.val)}
          >
            {e.label}
          </InputTypeStyle.RadioTab>
        ))}
      </div>

      {/* Age Filter */}
      <div className={classes.filterController}>
        {FILTER_AGE.map((e, idx) => (
          <InputTypeStyle.RadioTab
            key={`ageFilter-${idx}`}
            select={curFilter.ageGroup === e.val} // ageGroup과 정확히 비교
            onClick={() => filterAgeHandler(e.val)}
          >
            {e.label}
          </InputTypeStyle.RadioTab>
        ))}
      </div>
    </div>
  );
}
