import type { CSSProperties } from "react";
import type { HallPlaceType } from "../../../api/hall";
import styles from "./hall-place.module.css";

function HallPlace(props: {
  style?: CSSProperties;
  type: HallPlaceType;
  onClick?: () => void;
  selected?: boolean;
}) {
  const plaseTypeClass = styles[props.type];
  const selectedClass = props.selected ? styles.selected : "";

  return (
    <div
      className={`${styles.place} ${plaseTypeClass} ${selectedClass}`}
      onClick={props.onClick}
      style={props.style}
    ></div>
  );
}

export default HallPlace;
