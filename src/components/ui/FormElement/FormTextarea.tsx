import useRows from "@/_hook/useRows";
import { forwardRef, TextareaHTMLAttributes } from "react";
import { useFormContext } from "react-hook-form";
import { Textarea } from "../textarea";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../form";
import { CardContent, CardFooter, CardHeader } from "../card";

type TextAreaProps = {
  textareaName?: string;
} & TextareaHTMLAttributes<HTMLTextAreaElement>;

const FormTextarea = forwardRef<
  HTMLTextAreaElement,
  TextAreaProps & { label: string }
>(({ className, placeholder, name, label, ...rest }, ref) => {
  const [rows, rowsHandler] = useRows();
  const { control } = useFormContext();

  return (
    <>
      <FormField
        name={name as string}
        control={control}
        render={({ field }) => {
          return (
            <FormItem>
              <CardHeader>
                <FormLabel className="text-xl">{label}</FormLabel>
              </CardHeader>
              <CardContent>
                <FormControl>
                  <Textarea
                    placeholder={placeholder}
                    onChange={(e) => {
                      rowsHandler(e);
                      field?.onChange?.(e);
                    }}
                    rows={rows}
                  />
                </FormControl>
                <FormMessage className="mt-2" />
              </CardContent>
            </FormItem>
          );
        }}
      />
    </>
  );
});

FormTextarea.displayName = "FormTextarea";

export default FormTextarea;
