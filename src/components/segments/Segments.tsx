import { type ReactNode } from "react";
import Button from "../button/Button";
import styles from "./segments.module.css";

type SegmentType = {
  key: number;
  caption: ReactNode;
};

function Segments(props: {
  items: SegmentType[];
  onChange?: (key: SegmentType["key"]) => void;
  activeKey?: SegmentType["key"];
  disabled?: boolean;
}) {
  return (
    <div>
      {props.items.map((item) => (
        <Button
          key={item.key}
          onClick={() => {
            props.onChange?.(item.key);
          }}
          type="secondary"
          className={`${styles.button} ${props.activeKey === item.key ? styles.active : ""}`}
          disabled={props.disabled}
        >
          {item.caption}
        </Button>
      ))}
    </div>
  );
}

export default Segments;
