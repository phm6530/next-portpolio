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

//동적 Radio Style
function RadioAnswer({
  selectLabel,
  curLabel,
  children,
}: {
  selectLabel: string | null; // selectLabel이 null일 수도 있다고 가정
  curLabel: string;
  children: ReactNode;
}) {
  // console.log(selectLabel, curLabel);

  return (
    <label
      className={
        selectLabel == null
          ? classes.answer_null // null일 때 적용할 클래스
          : selectLabel === curLabel
          ? classes.answer_active // true일 때 적용할 클래스
          : classes.answer_noneActive // false 또는 undefined일 때 적용할 클래스
      }
    >
      {children}
    </label>
  );
}

//필수 Radio Style
function Radio<T extends HTMLLabelElement>({
  selectLabel,
  curLabel,
  children,
  ...rest
}: {
  selectLabel: string | null;
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
  RadioAnswer: typeof RadioAnswer;
  Radio: typeof Radio;
  RadioTab: typeof RadioTab;
}

const InputTypeStyle: InputTypeStyleProps = ({ children }) => {
  return <>{children}</>;
};

InputTypeStyle.RadioAnswer = RadioAnswer;
InputTypeStyle.Radio = Radio;
InputTypeStyle.RadioTab = RadioTab;

export default InputTypeStyle;
