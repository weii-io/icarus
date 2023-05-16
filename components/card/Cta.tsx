import React from "react";
import styles from "./Card.module.css";
type TProps = {
  children: React.ReactNode;
};
export const Cta = (props: TProps) => {
  return <div className={styles.cta}>{props.children}</div>;
};
