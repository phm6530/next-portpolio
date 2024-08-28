import Link from "next/link";
import classes from "./Button.module.scss";

function submit({ moveUrl, children }: { moveUrl: string; children: string }) {
  return (
    <Link href={moveUrl}>
      <span className={classes.importantButton}>{children}</span>
    </Link>
  );
}

interface ButtonProps extends React.FC<{ children: string }> {
  submit: typeof submit;
}

const Button: ButtonProps = ({ children }) => {
  return <>{children}</>;
};

Button.submit = submit;

export default Button;
