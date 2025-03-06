"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { TEMPLATERLIST_SORT } from "@/types/template.type";
import TabRounded from "@/components/ui/tab-rounded";

import Male from "/public/asset/3d/male.png";
import Female from "/public/asset/3d/female.png";
import Image from "next/image";

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
    Icon: Male,
  },
  {
    label: "여성 선호도",
    value: TEMPLATERLIST_SORT.FEMALE,
    Icon: Female,
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
    <div className="flex gap-2">
      {btnArr.map((btn, idx) => {
        return (
          <TabRounded
            active={active === btn.value}
            onClick={() => onClickHandler(btn.value)}
            key={`btn-${idx}`}
          >
            {btn.Icon && (
              <div className="w-5 h-5 relative">
                <Image
                  src={btn.Icon}
                  alt="logo"
                  fill
                  priority
                  style={{ objectFit: "contain" }}
                  sizes="(max-width: 768px) 50vw"
                />
              </div>
            )}

            {btn.label}
          </TabRounded>
        );
      })}
    </div>
  );
}
