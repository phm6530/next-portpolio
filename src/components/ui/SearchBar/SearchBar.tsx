import { UseFormRegisterReturn } from "react-hook-form";
import classes from "./SearchBar.module.scss";
import SearchIcon from "/public/asset/icon/searchIcon.svg";

interface SearchBarProps {
  placeholder: string;
  clickEvent: () => void;
  register: UseFormRegisterReturn;
}

export default function SearchBar({
  placeholder,
  clickEvent,
  register,
}: SearchBarProps) {
  return (
    <div className={classes.search}>
      <input autoComplete="off" placeholder={placeholder} {...register} />
      <button type="button" onClick={clickEvent}>
        <SearchIcon />
      </button>
    </div>
  );
}
