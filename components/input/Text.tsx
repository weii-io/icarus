import { BaseInputProps, TextProps } from "./interface";
import styles from "./Input.module.css";

export const Text: React.FC<BaseInputProps & TextProps> = (
  props: BaseInputProps
) => {
  return (
    <>
      <label htmlFor={props.id}>
        <span>{props.label}</span>
        {props.required && <span style={{ color: "red" }}>*</span>}
      </label>
      <br />
      <input
        {...props}
        className={styles.input}
        // value={props.value}
        // required={props.required}
        // className={styles.input}
        // autoComplete={props.autoComplete}
        // onChange={(event) => props.onChange(event)}
        // type="text"
        // id={props.id}
      />
    </>
  );
};
