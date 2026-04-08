import type { HallPlaceType, HallType } from "../../../api/hall";
import Hall from "../../../components/hall/Hall";
import styles from "./booking-hall.module.css";
import screenImg from "../../../assets/screen.png";
import HallPlace from "../../../components/hall/place/HallPlace";
import useFetch from "../../../hooks/use-fetch/useFetch";
import api from "../../../api/api";
import { useState } from "react";
import Spinner from "../../../components/spinner/Spinner";

function BookingHall(props: {
  seanceId: string;
  hall: HallType;
  onPlaceClick?: (
    rowIndex: number,
    colIndex: number,
    type: HallPlaceType,
  ) => void;
  isSelected?: (row: number, col: number) => boolean;
  date: string;
}) {
  const [hallConfig, setHallConfig] = useState<HallPlaceType[][]>();

  const { loading } = useFetch(
    () => api.seance.getHallConfig(props.seanceId, props.date),
    {
      onFetchSuccess: (result) => setHallConfig(result),
    },
  );

  if (loading && !hallConfig) {
    return <Spinner />;
  }

  return (
    <div className={styles["hall-wrapper"]}>
      <div>
        <Hall
          grid={hallConfig}
          isSelected={props.isSelected}
          onPlaceClick={props.onPlaceClick}
          renderScreen={() => (
            <div className={styles.screen}>
              <img
                style={{ width: "100%", maxWidth: "300px" }}
                src={screenImg}
              />
            </div>
          )}
        />
        <div className={styles["hall-footer"]}>
          <div className="d-flex flex-column gap-3">
            <div className={styles["place"]}>
              <HallPlace type={"standart"} /> Свободно(
              {props.hall.hall_price_standart}руб)
            </div>
            <div className={styles["place"]}>
              <HallPlace type={"vip"} /> Свободно VIP(
              {props.hall.hall_price_vip}
              руб)
            </div>
          </div>
          <div className="d-flex flex-column gap-3">
            <div className={styles["place"]}>
              <HallPlace type={"taken"} /> Занято
            </div>
            <div className={styles["place"]}>
              <HallPlace selected type={"standart"} /> Выбрано
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookingHall;
