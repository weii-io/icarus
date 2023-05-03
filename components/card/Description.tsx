import styles from "./Card.module.css";

type Props = {
  children: React.ReactNode;
};

export const Description = (props: Props) => {
  return <summary className={styles.description}>{props.children}</summary>;
};
