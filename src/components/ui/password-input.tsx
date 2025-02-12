"use client";

import { InputHTMLAttributes, useState } from "react";
import { Input } from "./input";
import { Eye, EyeOff } from "lucide-react";

export default function PasswordInput(
  props: InputHTMLAttributes<HTMLInputElement>
) {
  const [psView, setPsView] = useState<boolean>(false);

  const leaveToMouseHandler = () => {
    setPsView(false);
  };

  return (
    <div className="relative">
      <Input
        placeholder="비밀번호를 입력해주세요"
        autoComplete="off"
        type={psView ? "text" : "password"}
        className="w-full pr-10"
        {...props}
      />

      <div
        className="absolute right-0 top-0 cursor-pointer p-3.5 text-input"
        onMouseDown={() => setPsView(true)}
        onMouseUp={leaveToMouseHandler}
        onMouseLeave={leaveToMouseHandler}
      >
        {!psView ? <Eye /> : <EyeOff />}
      </div>
    </div>
  );
}
