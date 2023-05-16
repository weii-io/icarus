import React from "react";
import styles from "./Card.module.css";

type TProps = {
  children: React.ReactNode;
};

export const Description = (props: TProps) => {
  return <summary className={styles.description}>{props.children}</summary>;
};
