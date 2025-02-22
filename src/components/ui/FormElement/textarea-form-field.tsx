import { TextareaHTMLAttributes } from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../form";
import { Textarea } from "../textarea";

export default function TextareaFormField({
  name,
  label,

  ...rest
}: {
  name: string;
  label?: string;
} & TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <>
      <FormField
        name={name}
        render={({ field }) => {
          return (
            <FormItem>
              {label && <FormLabel>{label}</FormLabel>}
              <FormControl>
                <Textarea {...field} {...rest} />
              </FormControl>
              <FormMessage />
            </FormItem>
          );
        }}
      />
    </>
  );
}
