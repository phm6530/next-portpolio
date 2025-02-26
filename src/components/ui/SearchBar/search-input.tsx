import { cn } from "@/lib/utils";
import { SearchIcon } from "lucide-react";
import { InputHTMLAttributes } from "react";

export default function SearchBar({
  name,
  className,
  ...props
}: {
  name: string;
  className?: string;
} & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div
      className={cn(
        `border rounded-lg dark:bg-custom-input overflow-hidden focus-within:border-primary
       focus-within:focus-within:bg-[hsl(var(--custom-color))] flex flex-1`,
        className
      )}
    >
      <input
        type="text"
        autoComplete="off"
        name={name}
        className="bg-transparent flex-1 h-full p-4 pl-4"
        placeholder="검색어를 입력해주세요"
        {...props}
      />

      <button type="submit" className="flex items-center p-3 pr-3">
        <SearchIcon />
      </button>
    </div>
  );
}
