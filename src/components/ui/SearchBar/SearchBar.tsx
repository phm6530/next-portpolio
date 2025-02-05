import { UseFormRegisterReturn } from "react-hook-form";
import classes from "./SearchBar.module.scss";
import SearchIcon from "/public/asset/icon/searchIcon.svg";

interface SearchBarProps {
  placeholder: string;
  clickEvent: (e: React.FormEvent<HTMLFormElement>) => void;
  register?: UseFormRegisterReturn;
}

export default function SearchBar({ placeholder, clickEvent, register }: SearchBarProps) {
  return (
    <form
      className={classes.search}
      onSubmit={(e) => {
        e.preventDefault(); // 기본 새로고침 방지
        clickEvent(e);
      }}
    >
      <input autoComplete="off" placeholder={placeholder} {...register} />
      <button type="submit">
        <SearchIcon />
      </button>
    </form>
  );
}
