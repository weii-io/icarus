import styles from "./Card.module.css";
type Props = {
  children: React.ReactNode;
};
export const Cta = (props: Props) => {
  return <div className={styles.cta}>{props.children}</div>;
};
