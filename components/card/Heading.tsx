import React from "react";
import styles from "./Card.module.css";

type TProps = {
  children: React.ReactNode;
};
export const Heading = (props: TProps) => {
  return <header className={styles.heading}>{props.children}</header>;
};
