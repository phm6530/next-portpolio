"use client";

import { InputHTMLAttributes } from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useFormContext } from "react-hook-form";
import InputPassword from "@/components/ui/InputPassword";
import { cn } from "@/lib/utils";

export default function PasswordInputField({
  name = "password",
  label,
  placeholder = "비밀번호를 입력해주세요",
  className,
  errorField = true,
  ...rest
}: {
  name?: string;
  label?: string;
  errorField?: boolean;
} & InputHTMLAttributes<HTMLInputElement>) {
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        return (
          <FormItem className={cn(className)}>
            {label && <FormLabel>{label}</FormLabel>}
            <FormControl>
              <InputPassword
                {...field}
                placeholder={placeholder}
                {...rest}
                onChange={(e) => {
                  const value = e.target.value.replace(/\s/g, "");
                  field.onChange(value);
                }}
              />
            </FormControl>
            {errorField && <FormMessage />}
          </FormItem>
        );
      }}
    />
  );
}
