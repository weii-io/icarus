import classNames from "classnames";
import { BaseButtonProps } from "./interface";
import styles from "./Button.module.css";

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
