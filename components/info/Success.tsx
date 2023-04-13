import React from "react";
import { Icon } from "../Icon";
import styles from "./InfoToast.module.css";

type Props = {
  message: string;
};

export const Success = (props: Props) => {
  if (!props.message) return null;
  return (
    <div
      style={{
        backgroundColor: "#35D29D",
      }}
      className={styles.container}
    >
      <Icon
        fillColor={"#35D29D"}
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        strokeColor="white"
        height={32}
        width={32}
      >
        <Icon.CheckCircle />
      </Icon>
      <p>{props.message}</p>
    </div>
  );
};
