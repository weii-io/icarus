import styles from "./Card.module.css";

type Props = {
  children: React.ReactNode;
};
export const Heading = (props: Props) => {
  return <header className={styles.heading}>{props.children}</header>;
};
