import type { HallPlaceType } from "../../api/hall";
import HallPlace from "./place/HallPlace";
import styles from "./hall.module.css";
import type { ReactNode } from "react";

function Hall(props: {
  grid?: HallPlaceType[][];
  renderScreen: () => ReactNode;
  onPlaceClick?: (
    rowIndex: number,
    colIndex: number,
    type: HallPlaceType,
  ) => void;
  isSelected?: (row: number, col: number) => boolean;
}) {
  return (
    <div className={styles.container}>
      <div>{props.renderScreen()}</div>
      <div className={styles.places}>
        {(props.grid || []).map((row, rowIndex) => (
          <HallRow
            key={rowIndex}
            places={row}
            onPlaceClick={(colIndex, type) =>
              props.onPlaceClick?.(rowIndex, colIndex, type)
            }
            isSelected={(colIndex) => !!props.isSelected?.(rowIndex, colIndex)}
          />
        ))}
      </div>
    </div>
  );
}

function HallRow(props: {
  places: HallPlaceType[];
  onPlaceClick?: (colIndex: number, type: HallPlaceType) => void;
  isSelected?: (colIndex: number) => boolean;
}) {
  return (
    <div className={styles.row}>
      {props.places.map((placeType, index) => (
        <HallPlace
          style={{ cursor: "pointer" }}
          key={placeType + index}
          type={placeType}
          onClick={() => props.onPlaceClick?.(index, placeType)}
          selected={props.isSelected?.(index)}
        />
      ))}
    </div>
  );
}

export default Hall;
