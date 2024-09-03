import Link from "next/link";
import classes from "./Button.module.scss";
import { HTMLAttributes, ReactNode } from "react";

//close
function closeBtn({
  children,
  ...rest
}: { children: ReactNode } & HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={classes.closeButton} {...rest}>
      <span>{children}</span>
    </div>
  );
}

//Link
function moveLink({
  moveUrl,
  children,
}: {
  moveUrl: string;
  children: string;
}) {
  return (
    <Link href={moveUrl}>
      <div className={classes.importantButton}>
        <span>{children}</span>
      </div>
    </Link>
  );
}

function submit({
  children,
  ...rest
}: {
  children: string;
  [key: string]: any;
}) {
  return (
    <button {...rest} className={classes.submitButton}>
      {children}
    </button>
  );
}

interface ButtonProps extends React.FC<{ children: string }> {
  moveLink: typeof moveLink;
  submit: typeof submit;
  closeBtn: typeof closeBtn;
}

const Button: ButtonProps = ({ children }) => {
  return <>{children}</>;
};

Button.moveLink = moveLink;
Button.submit = submit;
Button.closeBtn = closeBtn;

export default Button;
