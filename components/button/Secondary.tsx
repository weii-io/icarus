import classNames from "classnames";
import { BaseButtonProps } from "./interface";
import styles from "./Button.module.css";

export const Secondary: React.FC<BaseButtonProps> = (
  props: BaseButtonProps
) => {
  return (
    <button
      className={classNames(styles.button, styles.secondary, props.className)}
      type={props.type}
    >
      {props.children}
    </button>
  );
};
