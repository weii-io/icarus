import classNames from "classnames";
import styles from "./Button.module.css";
import { BaseButtonProps } from "./button.interface";

export const Secondary: React.FC<BaseButtonProps> = (
  props: BaseButtonProps
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
