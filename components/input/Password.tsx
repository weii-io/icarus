import { BaseInputProps } from "./interface";
import styles from "./Input.module.css";

export const Password: React.FC<BaseInputProps> = (props: BaseInputProps) => {
  return (
    <>
      <label htmlFor="password">
        <label htmlFor="password">
          <span>Password</span>
          <span style={{ color: "red" }}>*</span>
        </label>
      </label>
      <br />
      <input
        className={styles.input}
        required
        onChange={(event) => props.onChange(event)}
        type="password"
        id="password"
        autoComplete="current-password"
        name="password"
        placeholder="Enter your password"
      />
    </>
  );
};
