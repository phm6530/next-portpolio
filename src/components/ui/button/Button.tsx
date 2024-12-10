import Link from "next/link";
import classes from "./Button.module.scss";
import {
  CSSProperties,
  HTMLAttributes,
  HtmlHTMLAttributes,
  ReactNode,
} from "react";
import Image from "next/image";
// import DeleteIcon from "/public/asset/icon/close.png";

function solid({
  type = "button",
  style,
  children,
  disabled,
}: {
  type?: "submit" | "button";
  style: CSSProperties;
  children: string;
  disabled?: boolean;
}) {
  return (
    <button
      type={type}
      style={style}
      disabled={disabled}
      className={classes.solidButton}
    >
      {children}
    </button>
  );
}

function noneStyleButton({
  fontSize,
  color,
  children,
  ...rest
}: {
  fontSize?: number;
  color?: string;
  children: ReactNode;
} & HtmlHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      style={{ fontSize, color }}
      className={classes.noneStyleButton}
      type="button"
      {...rest}
    >
      {children}
    </button>
  );
}

function normalButton({
  children,
  ...rest
}: { children: ReactNode } & HTMLAttributes<HTMLButtonElement>) {
  return (
    <button type="button" {...rest} className={classes.normalButton}>
      {children}
    </button>
  );
}

//close
function closeBtn({ ...rest }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={classes.closeButton} {...rest}>
      삭제
      {/* <Image src={DeleteIcon} alt="close" /> */}
      {/* <DeleteSvg className={classes.deleteIcon} /> */}
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
      <div className={classes.importantButton} style={{ borderRadius: "1rem" }}>
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
      <div className={classes.btns}>{children}</div>
    </button>
  );
}

interface ButtonProps extends React.FC<{ children: string }> {
  moveLink: typeof moveLink;
  submit: typeof submit;
  closeBtn: typeof closeBtn;
  normalButton: typeof normalButton;
  noneStyleButton: typeof noneStyleButton;
  solid: typeof solid;
}

const Button: ButtonProps = ({ children }) => {
  return <>{children}</>;
};

Button.moveLink = moveLink;
Button.submit = submit;
Button.closeBtn = closeBtn;
Button.normalButton = normalButton;
Button.noneStyleButton = noneStyleButton;
Button.solid = solid;

export default Button;
