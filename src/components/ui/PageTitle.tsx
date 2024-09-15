import React, { ReactNode } from "react";
import classes from "./PageTitle.module.scss";

export default function PageTitle({ children }: { children: ReactNode }) {
  const transformChildren = (children: ReactNode): ReactNode => {
    return React.Children.map(children, (child) => {
      if (
        React.isValidElement(child) &&
        child.props.className === "pointText"
      ) {
        // child의 텍스트를 단어 단위로 나누어 span으로 감싸는 작업
        const text = child.props.children;
        if (typeof text === "string") {
          const words = text.split("").map((word, index) => (
            <span key={index} className={classes.wordSpan}>
              {word}
            </span>
          ));
          return <div className={classes.pointText}>{words}</div>;
        }
      }
      return child;
    });
  };

  return (
    <div className={classes.pageTitleText}>{transformChildren(children)}</div>
  );
}
