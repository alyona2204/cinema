import { useNavigate } from "react-router-dom";
import type { FilmType } from "../../../../api/film";
import type { HallType } from "../../../../api/hall";
import type { SeanceType } from "../../../../api/seance";
import Text from "../../../../components/typography/text/Text";
import styles from "./film.module.css";
import moment from "moment";

function Film(props: {
  film?: FilmType;
  halls: HallType[];
  seances: SeanceType[];
  selectedDate: string;
}) {
  const navigate = useNavigate();
  const getSeances = (hall: HallType) => {
    return props.seances.filter((seance) => seance.seance_hallid === hall.id);
  };

  const isExpired = (seance: SeanceType) => {
    const now = moment();
    if (now.format("YYYY-MM-DD") !== props.selectedDate) {
      return false;
    }

    const seanceTime = moment(seance.seance_time, "HH:mm");
    const currentTime = moment(now.format("HH:mm"), "HH:mm");
    return seanceTime.isBefore(currentTime);
  };

  if (!props.film) {
    return null;
  }

  return (
    <div className={styles.container}>
      <div className={styles["film-info"]}>
        <div className={styles.poster}>
          <img src={props.film.film_poster} />
        </div>
        <div className="overflow-hidden">
          <Text ellipsis className={styles["film-name"]}>
            {props.film.film_name}
          </Text>
          <div className={styles["film-description"]}>
            {props.film.film_description}
          </div>
          <Text type="secondary">
            <span>
              {props.film.film_duration} мин {props.film.film_origin}
            </span>
          </Text>
        </div>
      </div>
      <div className={styles.halls}>
        {props.halls.map((hall) => {
          return (
            <div key={hall.id}>
              <h5 className={styles["hall-name"]}>{hall.hall_name}</h5>
              <Seances
                onSeanceClick={(id) => navigate(`booking/${id}`)}
                seances={getSeances(hall)}
                isExpired={isExpired}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

function Seances(props: {
  seances: SeanceType[];
  onSeanceClick: (id: number) => void;
  isExpired: (seance: SeanceType) => boolean;
}) {
  if (props.seances.length === 0) {
    return <span>Нет сеансов</span>;
  }

  return (
    <div className={styles.seances}>
      {props.seances.map((seance) => {
        return (
          <span
            key={seance.id}
            className={`${styles.seance} ${props.isExpired(seance) ? styles["expired-seance"] : ""}`}
            onClick={() => props.onSeanceClick(seance.id)}
          >
            {seance.seance_time}
          </span>
        );
      })}
    </div>
  );
}

export default Film;
