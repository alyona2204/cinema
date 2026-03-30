import type { DragEvent } from "react";
import type { FilmType } from "../../../../../api/film";
import Button from "../../../../../components/button/Button";
import Text from "../../../../../components/typography/text/Text";
import styles from "./film.module.css";

function Film(props: {
  film: FilmType;
  onDelete: () => void;
  disabled?: boolean;
  draggable?: boolean;
  onDragStart?: (e: DragEvent<HTMLDivElement>) => void;
}) {
  return (
    <div
      className={styles.container}
      draggable={props.draggable}
      style={props.draggable ? { cursor: "grab" } : undefined}
      onDragStart={(e) => props.onDragStart?.(e)}
    >
      <img src={props.film.film_poster} className={styles.poster} />
      <div className={styles.content}>
        <div className={styles.title}>
          <Text ellipsis={true}>{props.film.film_name}</Text>
        </div>
        <div className={styles.footer}>
          <div className={styles.duration}>{props.film.film_duration} мин</div>
          <Button
            className={styles.deleteButton}
            onClick={() => props.onDelete()}
            type="secondary"
            disabled={props.disabled}
          >
            <span className={styles.deleteIcon}>&#x1F5D1;</span>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Film;
