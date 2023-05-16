import React from "react";
import classNames from "classnames";
import styles from "../../styles/Register.module.css";

type TProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
  index: number;
  activeIndex: number;
};

export const Tab: React.FC<TProps> = (props: TProps) => {
  return (
    <div
      className={classNames({
        [styles.tab]: true,
        [styles.active]: props.activeIndex === props.index,
      })}
    >
      {props.icon}
      <div>
        <p className={classNames("bold")}>{props.title}</p>
        <p>{props.description}</p>
      </div>
    </div>
  );
};
