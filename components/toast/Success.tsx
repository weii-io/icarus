import React from "react";
import { Icon } from "../Icon";
import styles from "./Toast.module.css";
import { ToastProps } from "./type";

export const Success = (props: ToastProps) => {
  if (!props.message) return null;
  return (
    <div
      style={{
        backgroundColor: "#35D29D",
      }}
      className={styles.container}
    >
      <div onClick={props.handleClose} className={styles.close}>
        <Icon
          fillColor={"#EB4F61"}
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          strokeColor="white"
          height={18}
          width={18}
        >
          <Icon.X />
        </Icon>
      </div>
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
