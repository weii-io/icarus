import React from "react";
import styles from "../styles/Spinner.module.css";

type Props = {
  size?: number;
  color?: string;
  visible: boolean;
};

export const Spinner: React.FC<Props> = ({
  size = 32,
  color = "#ffffff",
  visible = false,
}) => {
  return (
    <div
      className={styles.spinner}
      style={{
        width: size,
        height: size,
        borderTopColor: color,
        visibility: visible ? "visible" : "hidden",
      }}
    ></div>
  );
};
