"use client";

import { AddSurveyFormProps } from "@/types/templateSurvey";
import { ChangeEvent, useEffect, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ko from "date-fns/locale/ko";
import dayjs from "dayjs";
import { Locale } from "react-datepicker/dist/date_utils";

export default function AddDateRange() {
  const {
    getValues,
    control,
    reset,
    formState: { errors },
    watch,
  } = useFormContext<AddSurveyFormProps>();
  const [isDateRange, setIsDateRange] = useState<boolean>(false);

  useEffect(() => {
    const range = getValues("dateRange");
    setIsDateRange(!!range ? true : false);
  }, [getValues]);

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.value === "true") {
      setIsDateRange(true);
      // 특정 필드만 초기화
      reset({ dateRange: [] }, { keepValues: true });
    } else if (e.currentTarget.value === "false") {
      setIsDateRange(false);
      // 특정 필드만 초기화
      reset({ dateRange: null }, { keepValues: true });
    }
  };
  const dateRange = watch("dateRange");

  //선택 날짜
  const firstDateAsString =
    dateRange && (dateRange as unknown as [string, string])[0];

  const firstDate = dayjs(firstDateAsString);
  const today = dayjs(); // 오늘 날짜

  //오늘날짜 비교
  const same = firstDate.isSame(today, "day");

  return (
    <>
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
        />{" "}
        기한 설정
      </label>
      {isDateRange && (
        <>
          <Controller
            name="dateRange"
            control={control}
            rules={{ required: isDateRange && "날짜 범위는 필수입니다." }}
            render={({ field }) => (
              <DatePicker
                onChange={(dates) => {
                  field.onChange(dates);
                }}
                startDate={field.value ? field.value[0] : undefined}
                endDate={field.value ? field.value[1] : undefined}
                selectsRange
                isClearable // 날짜 지우기 가능
                placeholderText="날짜를 선택해주세요"
                minDate={new Date()} // 최소 오늘날짜
                locale={ko as unknown as Locale}
                dateFormat={"yyyy.MM.dd"}
              />
            )}
          />
          {/* 시작일 종료일 기재 */}
          {dateRange &&
            dateRange[0] &&
            dayjs(dateRange[0]).format("YYYY-MM-DD")}
          {same && "시작일이 오늘날짜라면 즉시 시작됩니다!"}~
          {dateRange &&
            dateRange[1] &&
            dayjs(dateRange[1]).format("YYYY-MM-DD")}
          {errors.dateRange?.message}
        </>
      )}
    </>
  );
}
