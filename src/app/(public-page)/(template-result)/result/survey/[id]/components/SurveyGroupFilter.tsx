import { Dispatch, SetStateAction } from "react";

import { DetailRespondents } from "@/types/template.type";
import { ageGroupProps } from "@/types/template";
import { FILTER_GENDER } from "../../../constants/filter-gender-group";
import { FILTER_AGE } from "../../../constants/filter-age-group";
import TabRounded from "@/components/ui/tab-rounded";

export type GenderOptions = (typeof FILTER_GENDER)[number]["val"];
export type AgeOptions = (typeof FILTER_AGE)[number]["val"];

export default function SurveyGroupFilter({
  curFilter,
  setFilter,
  respondents,
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
  respondents: DetailRespondents;
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

  const cntFilter = (val: ageGroupProps) => {
    const { genderGroup } = curFilter;
    const { detail } = respondents;

    if (val === "all") {
      if (genderGroup === "all") {
        // 모든 성별과 모든 연령대 합산
        return (
          Object.values(detail.female).reduce(
            (sum, count) => sum + (count || 0),
            0
          ) +
          Object.values(detail.male).reduce(
            (sum, count) => sum + (count || 0),
            0
          )
        );
      } else {
        // 특정 성별의 모든 연령대 합산
        return Object.values(detail[genderGroup]).reduce(
          (sum, count) => sum + (count || 0),
          0
        );
      }
    }

    // 특정 연령대의 성별 필터링
    if (genderGroup === "all") {
      return (detail.female[val] || 0) + (detail.male[val] || 0);
    } else {
      return detail[genderGroup][val] || 0;
    }
  };

  return (
    <div className="flex flex-col gap-2">
      {/* Gender Filter */}
      <div className="flex gap-2">
        {FILTER_GENDER.map((e, idx) => (
          <TabRounded
            key={`genderFilter-${idx}`}
            active={curFilter.genderGroup === e.val} // genderGroup과 정확히 비교
            onClick={() => filterGenderHandler(e.val)}
          >
            {e.label}
          </TabRounded>
        ))}
      </div>

      {/* Age Filter */}
      <div className="flex flex-col ">
        <div className="flex  gap-2">
          {FILTER_AGE.map((e, idx) => {
            return (
              <TabRounded
                key={`ageFilter-${idx}`}
                active={curFilter.ageGroup === e.val} // ageGroup과 정확히 비교
                onClick={() => filterAgeHandler(e.val)}
              >
                {e.label} <span>({cntFilter(e.val)})</span>
              </TabRounded>
            );
          })}
        </div>
      </div>
    </div>
  );
}
