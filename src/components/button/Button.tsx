import type { CSSProperties, PropsWithChildren } from "react";
import styles from "./button.module.css";

type ButtonType = "primary" | "secondary";

function Button(
  props: PropsWithChildren<{
    type?: ButtonType;
    onClick?: () => void;
    disabled?: boolean;
    style?: CSSProperties;
    className?: string;
  }>,
) {
  const typeClass = styles[props.type || "primary"];

  return (
    <button
      className={`${styles.button} ${typeClass} ${props.className ?? ""}`}
      onClick={props.onClick}
      disabled={props.disabled}
      style={props.style}
    >
      {props.children}
    </button>
  );
}

export default Button;
