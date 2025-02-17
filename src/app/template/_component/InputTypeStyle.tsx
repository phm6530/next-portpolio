import { HTMLAttributes, ReactNode } from "react";
import classes from "./InputTypeStyle.module.scss";
import Chk from "/public/asset/icon/check.svg";
import { cn } from "@/lib/utils";
import {
  Check,
  CheckCircle,
  CheckCircle2,
  CheckSquare,
  CheckSquare2,
} from "lucide-react";

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
  selectId,
  curid,
  children,
}: {
  selectId: string | undefined; // selectLabel이 null일 수도 있다고 가정
  curid: string;
  children: ReactNode;
}) {
  return (
    <label
      className={cn(
        "flex opacity-80 p-3.5 border transition-all   items-center rounded-lg cursor-pointer",
        selectId === curid &&
          "opacity-100 scale-105 border-primary bg-primary/20 "
      )}
    >
      <div className={cn("w-4 h-5")}>
        <CheckSquare />
      </div>
      <div className="pl-4">{children}</div>
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
