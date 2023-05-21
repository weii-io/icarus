import styles from "./Tasks.module.css";
import { CreateTaskDialog } from "./Dialog";
export const Tasks: React.FC = () => {
  return (
    <div role="contentinfo">
      <nav className={styles.nav}>
        <h1>Tasks</h1>
        <CreateTaskDialog />
      </nav>
    </div>
  );
};
