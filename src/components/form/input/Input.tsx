import type { HTMLInputTypeAttribute } from "react";
import styles from "./input.module.css";

export type InputPropsType<V> = {
  value?: V;
  label?: string;
  htmlFor?: string;
  onChange?: (value: string) => void;
  style?: React.CSSProperties;
  type?: HTMLInputTypeAttribute;
  placeholder?: string;
};

function Input<V extends string | number>(props: InputPropsType<V>) {
  return (
    <div className={styles.container} style={props.style}>
      <label htmlFor={props.htmlFor} className={`${styles.label} form-label`}>
        {props.label}
      </label>
      <input
        value={props.value}
        className={`${styles.input} form-control`}
        onChange={(e) => props.onChange?.(e.currentTarget.value)}
        type={props.type}
        placeholder={props.placeholder}
      />
    </div>
  );
}

export default Input;
