import React from "react";
import classNames from "classnames";
import styles from "./Button.module.css";
import { TBaseButtonProps } from "./button.type";

export const Secondary: React.FC<TBaseButtonProps> = (
  props: TBaseButtonProps
) => {
  return (
    <button
      {...props}
      className={classNames(styles.button, styles.secondary, props.className)}
    >
      {props.children}
    </button>
  );
};
