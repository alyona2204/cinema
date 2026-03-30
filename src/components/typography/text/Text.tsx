import type { ReactNode } from "react";
import styles from "./text.module.css";

function Text(props: {
  type?: "primary-dark" | "primary-light" | "secondary";
  children: ReactNode;
  className?: string;
  ellipsis?: boolean;
}) {
  const typeClass = styles[props.type || "primary-dark"];
  const ellipsisClass = props.ellipsis ? styles.ellipsis : "";
  const className = [typeClass, ellipsisClass, props.className]
    .filter(Boolean)
    .join(" ");

  return <span className={className}>{props.children}</span>;
}

export default Text;
