import type { CSSProperties, ReactNode } from "react";
import styles from "./content-section.module.css";

const DEFAULT_GAP = 10;

function ContentSection(props: {
  title: ReactNode;
  children: ReactNode;
  gap?: number;
  style?: CSSProperties;
}) {
  return (
    <div
      className={styles.container}
      style={{ gap: props.gap || DEFAULT_GAP, ...props.style }}
    >
      <div className={styles.title}>{props.title}</div>
      {props.children}
    </div>
  );
}

export default ContentSection;
