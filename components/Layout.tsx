import React from "react";
import styles from "../styles/Layout.module.css";
import classNames from "classnames";

type Props = {
  children: React.ReactNode;
} & React.HTMLProps<HTMLDivElement>;

export const Layout: React.FC<Props> = ({ children, ...props }: Props) => {
  return (
    <main {...props} className={classNames(styles.layout, props.className)}>
      {children}
    </main>
  );
};
