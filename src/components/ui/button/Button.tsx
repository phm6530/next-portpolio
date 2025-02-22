import Link from "next/link";
import classes from "./Button.module.scss";
import {
  ButtonHTMLAttributes,
  CSSProperties,
  HTMLAttributes,
  HtmlHTMLAttributes,
  ReactNode,
} from "react";
// import DeleteIcon from "/public/asset/icon/close.png";

import Delete from "/public/asset/icon/delete_3.svg";

function outlineButton({
  children,
  ...rest
}: {
  children: ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button type="button" {...rest} className={classes.outlineButton}>
      {children}
    </button>
  );
}

function solid({
  children,
  className,
  ...rest
}: {
  children: string;
  className?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...rest}
      className={`${classes.solidButton} ${
        className ? className : undefined
      }`}
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
      {/* 삭제 */}
      {/* <Image src={DeleteIcon} alt="close" /> */}
      <Delete className={classes.deleteIcon} />
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
      <div
        className={classes.importantButton}
        style={{ borderRadius: "1rem" }}
      >
        <span>{children}</span>
      </div>
    </Link>
  );
}

function submit({
  children,
  ...rest
}: { children: string } & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button {...rest} className={classes.submitButton}>
      <div className={classes.btns}>{children}</div>
    </button>
  );
}

function BannerBtn({
  children,
  ...rest
}: {
  children: ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button {...rest} className={classes.BannerBtn}>
      {children}
    </button>
  );
}

interface ButtonProps extends React.FC<{ children: ReactNode }> {
  moveLink: typeof moveLink;
  submit: typeof submit;
  closeBtn: typeof closeBtn;
  normalButton: typeof normalButton;
  noneStyleButton: typeof noneStyleButton;
  solid: typeof solid;
  outlineButton: typeof outlineButton;
  BannerBtn: typeof BannerBtn;
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
Button.outlineButton = outlineButton;
Button.BannerBtn = BannerBtn;

export default Button;
