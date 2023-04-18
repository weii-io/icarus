import { BaseInputProps, TextProps } from "./interface";
import styles from "./Input.module.css";
import { ChangeEventHandler } from "react";

export const TextArea: React.FC<BaseInputProps & TextProps> = (
  props: BaseInputProps
) => {
  return (
    <>
      <label htmlFor={props.id}>
        <span>{props.label}</span>
        {props.required && <span style={{ color: "red" }}>*</span>}
      </label>
      <br />
      <textarea
        id={props.id}
        name={props.name}
        value={props.value}
        onChange={
          props.onChange as ChangeEventHandler<HTMLTextAreaElement> | undefined
        }
        rows={5}
        cols={40}
        className={styles.input}
      />
    </>
  );
};
