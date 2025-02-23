import { HTMLAttributes, ReactNode } from "react";
import classes from "./InputTypeStyle.module.scss";

// Tab
interface RadioTabProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  select: boolean;
}

const RadioTab: React.FC<RadioTabProps> = ({ children, select, ...rest }) => {
  return (
    <div
      className={`${classes.tab} ${select ? classes.active : undefined}`}
      {...rest}
    >
      {children}
    </div>
  );
};

//필수 Radio Style
function Radio<T extends HTMLLabelElement>({
  selectLabel,
  curLabel,
  children,
  ...rest
}: {
  selectLabel: string | undefined;
  curLabel: string;
  children: ReactNode;
} & HTMLAttributes<T>) {
  return (
    <label
      className={
        selectLabel == null
          ? classes.radio_null // null일 때 적용할 클래스
          : selectLabel === curLabel
          ? classes.radio_active // true일 때 적용할 클래스
          : classes.radio_noneActive // false 또는 undefined일 때 적용할 클래스
      }
      {...rest}
    >
      {children}
    </label>
  );
}

interface InputTypeStyleProps extends React.FC<{ children: ReactNode }> {
  Radio: typeof Radio;
  RadioTab: typeof RadioTab;
}

const InputTypeStyle: InputTypeStyleProps = ({ children }) => {
  return <>{children}</>;
};

InputTypeStyle.Radio = Radio;
InputTypeStyle.RadioTab = RadioTab;

export default InputTypeStyle;
