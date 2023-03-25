import styles from "../../styles/Home.module.css";

export const Layout: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  return <div className={styles.layout}>{children}</div>;
};
