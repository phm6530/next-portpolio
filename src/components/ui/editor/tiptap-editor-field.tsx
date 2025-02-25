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

  return (
    <>
      <FormField
        name={name}
        control={formMethod.control}
        render={({ field }) => {
          const { ref, ...restField } = field;
          return (
            <FormItem>
              <FormLabel>
                설명 <span className="text-primary">*</span>
              </FormLabel>
              <FormControl>
                <TipTapEditor {...restField} placeholder={placeholder} />
              </FormControl>
              <FormMessage />
            </FormItem>
          );
        }}
      />
    </>
  );
}
