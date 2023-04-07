import classNames from "classnames";
import { BaseButtonProps } from "./interface";
import styles from "./Button.module.css";

export const Primary: React.FC<BaseButtonProps> = (props: BaseButtonProps) => {
  return (
    <button
      className={classNames(styles.button, styles.primary, props.className)}
      type={props.type}
    >
      {props.children}
    </button>
  );
};
