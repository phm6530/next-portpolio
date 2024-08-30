import { ReactNode } from "react";
import classes from "./InputTypeStyle.module.scss";

//동적 Radio Style
function RadioAnswer({
  selectLabel,
  children,
}: {
  selectLabel: boolean;
  children: ReactNode;
}) {
  return (
    <label
      className={
        selectLabel ? classes.answer_active : classes.answer_noneActive
      }
    >
      {children}
    </label>
  );
}

//필수 Radio Style
function Radio({
  selectLabel,
  children,
}: {
  selectLabel: boolean;
  children: ReactNode;
}) {
  return (
    <label className={selectLabel ? classes.active : classes.nonActive}>
      {children}
    </label>
  );
}

interface IntpitTypeStyleProps extends React.FC<{ children: ReactNode }> {
  RadioAnswer: typeof RadioAnswer;
  Radio: typeof Radio;
}

const InputTypeStyle: IntpitTypeStyleProps = ({ children }) => {
  return <>{children}</>;
};

InputTypeStyle.RadioAnswer = RadioAnswer;
InputTypeStyle.Radio = Radio;

export default InputTypeStyle;
