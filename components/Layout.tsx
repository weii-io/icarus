import React from "react";
import styles from "../styles/Layout.module.css";

export const Layout: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  return <main className={styles.layout}>{children}</main>;
};
