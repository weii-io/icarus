import React from "react";
import styles from "./InfoToast.module.css";
import { Icon } from "../Icon";

type Props = {
  message: string;
};

export const Error = (props: Props) => {
  if (!props.message) return null;
  return (
    <div
      style={{
        backgroundColor: "#EB4F61",
      }}
      className={styles.container}
    >
      <Icon
        fillColor={"#EB4F61"}
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        strokeColor="white"
        height={24}
        width={24}
      >
        <Icon.ExclamationCircle />
      </Icon>
      <p>{props.message}</p>
    </div>
  );
};
