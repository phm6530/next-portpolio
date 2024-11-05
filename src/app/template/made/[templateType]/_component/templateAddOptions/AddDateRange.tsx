"use client";

import { ChangeEvent, useEffect, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ko from "date-fns/locale/ko";
import dayjs from "dayjs";
import { Locale } from "react-datepicker/dist/date_utils";
import RadioWrap from "@/components/ui/RadioWrap";
import { RequestSurveyFormData } from "@/app/(template-made)/made/[...madeType]/components/survey/CreateSurvey";

export default function AddDateRange() {
  const { control, watch } = useFormContext<RequestSurveyFormData>();
  const [isDateRange, setIsDateRange] = useState<boolean>(false);

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.value === "true") {
      setIsDateRange(true);
    } else if (e.currentTarget.value === "false") {
      setIsDateRange(false);
    }
  };
  const dateRange = watch();
  console.log(watch());

  //선택 날짜
  const firstDateAsString =
    dateRange && (dateRange as unknown as [string, string])[0];

  const firstDate = dayjs(firstDateAsString);
  const today = dayjs(); // 오늘 날짜

  //오늘날짜 비교
  const same = firstDate.isSame(today, "day");

  return (
    <RadioWrap>
      설문조사 기간
      <label>
        <input
          type="radio"
          value={"false"}
          name="dateRanges"
          onChange={onChangeHandler}
          checked={!isDateRange}
        />
        무기한
      </label>
      <label>
        <input
          type="radio"
          value={"true"}
          name="dateRanges"
          onChange={onChangeHandler}
          checked={isDateRange}
        />
        기한 설정
      </label>
      {isDateRange && (
        <>
          <Controller
            name="startDate"
            control={control}
            rules={{ required: isDateRange && "시작 날짜는 필수입니다." }}
            render={({ field }) => (
              <DatePicker
                selected={field.value}
                onChange={(date) => field.onChange(date)}
                placeholderText="시작 날짜를 선택해주세요"
                minDate={new Date()}
                locale={ko as unknown as Locale}
                dateFormat={"yyyy.MM.dd"}
              />
            )}
          />

          <Controller
            name="endDate"
            control={control}
            rules={{ required: isDateRange && "시작 날짜는 필수입니다." }}
            render={({ field }) => (
              <DatePicker
                selected={field.value}
                onChange={(date) => field.onChange(date)}
                placeholderText="시작 날짜를 선택해주세요"
                minDate={new Date()}
                locale={ko as unknown as Locale}
                dateFormat={"yyyy.MM.dd"}
              />
            )}
          />

          {/* 시작일 종료일 기재 */}
          {/* {dateRange &&
            dateRange[0] &&
            dayjs(dateRange[0]).format("YYYY-MM-DD")}
          {same && "시작일이 오늘날짜라면 즉시 시작됩니다!"}~
          {dateRange &&
            dateRange[1] &&
            dayjs(dateRange[1]).format("YYYY-MM-DD")} */}
          {/* {errors.dateRange?.message} */}
        </>
      )}
    </RadioWrap>
  );
}
