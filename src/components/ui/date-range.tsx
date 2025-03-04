"use client";

import { useFormContext } from "react-hook-form";
import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./form";
import dayjs from "dayjs";
import "dayjs/locale/ko";
import relativeTime from "dayjs/plugin/relativeTime";
import { Button } from "./button";
import { cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { CalendarIcon, Check, Timer } from "lucide-react";

dayjs.extend(relativeTime);
dayjs.locale("ko");

export default function DateRangeSelector() {
  const { watch, control } = useFormContext();

  console.log(watch());

  return (
    <>
      <FormField
        control={control}
        name="startDate"
        render={({ field }) => (
          <FormItem className="flex flex-col">
            <FormLabel className="flex gap-2 items-center">
              <Check className="w-4 h-4" /> 시작일 (선택)
            </FormLabel>
            <Popover>
              <PopoverTrigger asChild>
                <FormControl>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-[240px] pl-3 text-left font-normal",
                      !field.value && "text-muted-foreground"
                    )}
                  >
                    {!field.value
                      ? "시작일을 선택해주세요"
                      : dayjs(field.value).format("YYYY-MM-DD")}

                    <CalendarIcon
                      local={"ko"}
                      className="ml-auto h-4 w-4 opacity-50"
                    />
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={field.value}
                  onSelect={(date) => {
                    if (dayjs(date).isSame(dayjs(field.value), "day")) {
                      field.onChange(null);
                    } else {
                      field.onChange(date);
                    }
                  }}
                  disabled={(date) => {
                    const today = new Date();
                    today.setHours(0, 0, 0, 0);

                    if (date < today) {
                      return true;
                    }
                    if (!!watch("endDate")) {
                      return date >= new Date(watch("endDate"));
                    }

                    return false;
                  }}
                  initialFocus
                />
              </PopoverContent>
            </Popover>

            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="endDate"
        render={({ field }) => (
          <FormItem className="flex flex-col">
            <FormLabel className="flex gap-2 items-center">
              <Check className="w-4 h-4" /> 종료일 (선택)
            </FormLabel>
            <Popover>
              <PopoverTrigger asChild>
                <FormControl>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-[240px] pl-3 text-left font-normal",
                      !field.value && "text-muted-foreground"
                    )}
                  >
                    {!field.value
                      ? "종료일을 선택해주세요"
                      : dayjs(field.value).format("YYYY-MM-DD")}
                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={field.value}
                  onSelect={(date) => {
                    if (dayjs(date).isSame(dayjs(field.value), "day")) {
                      field.onChange(null);
                    } else {
                      field.onChange(date);
                    }
                  }}
                  disabled={(date) => date < new Date(watch("startDate"))}
                  initialFocus
                />
              </PopoverContent>
            </Popover>

            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
}
