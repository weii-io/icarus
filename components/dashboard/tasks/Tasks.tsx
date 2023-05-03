import { CreateTaskWrapper } from "./CreateTaskWrapper";
import styles from "./Tasks.module.css";
export const Tasks: React.FC = () => {
  return (
    <div role="contentinfo">
      <nav className={styles.nav}>
        <h1>Tasks</h1>
        <CreateTaskWrapper />
      </nav>
    </div>
  );
};
