import React from "react";
import { Heading } from "./Heading";
import { Description } from "./Description";
import styles from "./Card.module.css";
import { Cta } from "./Cta";

type Props = {
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>;

type CardSubComponents = {
  Heading: typeof Heading;
  Description: typeof Description;
  Cta: typeof Cta;
};

export const Card: React.FC<Props> & CardSubComponents = (props: Props) => {
  return (
    <div {...props} className={styles.container} role="card">
      {props.children}
    </div>
  );
};

Card.Heading = Heading;
Card.Description = Description;
Card.Cta = Cta;
