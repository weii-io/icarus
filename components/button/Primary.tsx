import classNames from "classnames";
import styles from "./Button.module.css";
import { BaseButtonProps } from "./button.interface";

export const Primary: React.FC<BaseButtonProps> = (props: BaseButtonProps) => {
  return (
    <button
      {...props}
      className={classNames(styles.button, styles.primary, props.className)}
    >
      {props.children}
    </button>
  );
};
