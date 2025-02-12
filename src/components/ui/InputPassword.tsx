"use client";

import { InputHTMLAttributes, useState } from "react";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";

export default function InputPassword(
  props: InputHTMLAttributes<HTMLInputElement>
) {
  const [psView, setPsView] = useState<boolean>(false);

  const leaveToMouseHandler = () => {
    setPsView(false);
  };

  return (
    <div className="relative">
      <Input
        autoComplete="off"
        type={psView ? "text" : "password"}
        className="w-full pr-10"
        aria-autocomplete="none"
        aria-hidden="true"
        {...props}
      />

      <div
        className="absolute right-0 top-0 cursor-pointer p-3.5 text-input"
        onMouseDown={() => setPsView(true)}
        onMouseUp={leaveToMouseHandler}
        onMouseLeave={leaveToMouseHandler}
      >
        {!psView ? (
          <Eye className="icon-hover" />
        ) : (
          <EyeOff className="icon-hover" />
        )}
      </div>
    </div>
  );
}
