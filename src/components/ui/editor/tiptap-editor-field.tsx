import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../form";
import TipTapEditor from "./tiptap-editor";

export default function TipTapEditorField({
  name,
  placeholder,
}: {
  name: string;
  placeholder: string;
}) {
  const formMethod = useFormContext();
  console.log(formMethod.watch());

  return (
    <>
      <FormField
        name={name}
        control={formMethod.control}
        render={({ field }) => {
          return (
            <FormItem>
              <FormLabel>설명</FormLabel>
              <FormControl>
                <TipTapEditor {...field} placeholder={placeholder} />
              </FormControl>
              <FormMessage />
            </FormItem>
          );
        }}
      />
    </>
  );
}
