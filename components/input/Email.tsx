import { BaseInputProps } from "./interface";
import styles from "./Input.module.css";

export const Email: React.FC<BaseInputProps> = (props: BaseInputProps) => {
  return (
    <>
      <label htmlFor="email">
        <span>Email</span>
        <span style={{ color: "red" }}>*</span>
      </label>
      <br />
      <input
        className={styles.input}
        required
        onChange={(event) => props.onChange(event)}
        type="email"
        autoComplete="email"
        name="email"
        id="email"
        placeholder="Enter your email"
      />
    </>
  );
};
