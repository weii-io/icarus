import React from "react";
import styles from "./Card.module.css";
import { Heading } from "./Heading";
import { Description } from "./Description";
import { Cta } from "./Cta";

type TProps = {
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>;

type TSubComponents = {
  Heading: typeof Heading;
  Description: typeof Description;
  Cta: typeof Cta;
};

export const Card: React.FC<TProps> & TSubComponents = (props: TProps) => {
  return (
    <div {...props} className={styles.container} role="card">
      {props.children}
    </div>
  );
};

Card.Heading = Heading;
Card.Description = Description;
Card.Cta = Cta;
