import { useState, type DragEventHandler } from "react";
import type { FilmType } from "../../../../../api/film";
import type { SeanceType } from "../../../../../api/seance";
import styles from "./timeline.module.css";

// converts time in the format "HH:MM" to hours (for example, "14:30" → 14.5)
const timeToHours = (time: string): number => {
  const [hours, minutes] = time.split(":").map(Number);
  return hours + minutes / 60;
};

function Timeline(props: {
  title: string;
  seances: SeanceType[];
  films: FilmType[];
  onDragOver?: DragEventHandler<HTMLDivElement>;
  onDrop?: DragEventHandler<HTMLDivElement>;
  onSeanceDelete?: (seanceId: number) => void;
}) {
  const [isSeanceDragging, setIsSeanceDragging] = useState(false);

  return (
    <div>
      <div className={styles.header}>
        <h6 style={{ margin: "5px 0" }}> {props.title}</h6>
        {isSeanceDragging ? (
          <div
            className={styles["deletion-drop-zone"]}
            onDragOver={(e) => {
              e.preventDefault();
            }}
            onDrop={(e) => {
              const droppedSeanceId = e.dataTransfer.getData("seanceId");
              if (!droppedSeanceId) {
                return;
              }
              props.onSeanceDelete?.(Number(droppedSeanceId));
            }}
          >
            <span>🗑️</span>
            <span>{"Перетащите сюда для удаления"}</span>
          </div>
        ) : null}
      </div>
      <div className={styles["scroll-wrapper"]}>
        <div
          onDragOver={props.onDragOver}
          onDrop={props.onDrop}
          className={styles.timeline}
        >
          {props.seances?.map((seance) => {
            const film = props.films?.find(
              (f) => f.id === seance.seance_filmid,
            );
            if (!film) return null;

            const startHour = timeToHours(seance.seance_time);
            const durationInHours = film.film_duration / 60;

            // calculating the left offset and width as a percentage
            const left = (startHour / 24) * 100;
            const width = (durationInHours / 24) * 100;

            return (
              <div
                draggable
                key={seance.id}
                className={styles.seance}
                style={{
                  left: `${left}%`,
                  width: `${width}%`,
                }}
                title={`${film.film_name} (${seance.seance_time})`}
                onDragStart={(e) => {
                  setIsSeanceDragging(true);
                  e.dataTransfer.setData("seanceId", seance.id.toString());
                }}
                onDragEnd={() => setIsSeanceDragging(false)}
              >
                {film.film_name}
              </div>
            );
          })}
        </div>

        <div className={styles["time-labels"]}>
          {Array.from({ length: 24 }, (_, i) => {
            return (
              <div key={i} className={styles["time-label-item"]}>
                {i === 0 ? null : <span>{i}:00</span>}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Timeline;
