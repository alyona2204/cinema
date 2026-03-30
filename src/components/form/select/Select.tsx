import type { CSSProperties } from "react";
import styles from "./select.module.css";

export type OptionType = {
  key: string | number;
  value: string;
  text: string;
};

function Select(props: {
  options: OptionType[];
  style?: CSSProperties;
  htmlFor?: string;
  label: string;
  onChange?: (value: string) => void;
  value: string;
}) {
  return (
    <div className={styles.container} style={props.style}>
      <label htmlFor={props.htmlFor} className={`${styles.label} form-label`}>
        {props.label}
      </label>
      <select
        value={props.value}
        className={`${styles.select} form-select`}
        onChange={(e) => props.onChange?.(e.currentTarget.value)}
      >
        {props.options.map((opt) => (
          <option value={opt.value} key={opt.key}>
            {opt.text}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Select;
