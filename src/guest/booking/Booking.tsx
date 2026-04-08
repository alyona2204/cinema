import { useState } from "react";
import type { AllDataType } from "../../api/all-data";
import Spinner from "../../components/spinner/Spinner";
import useFetchAllData from "../../hooks/use-fetch-all-data/useFetchAllData";
import styles from "./booking.module.css";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Text from "../../components/typography/text/Text";
import BookingHall from "./booking-hall/BookingHall";
import Button from "../../components/button/Button";
import type { HallPlaceType, HallType } from "../../api/hall";
import type { FilmType } from "../../api/film";
import type { SeanceType } from "../../api/seance";

export type SelectedPlace = {
  rowIndex: number;
  colIndex: number;
  coast: number;
};

export type BookingLocationState = {
  selectedPlaces: SelectedPlace[];
  hall: HallType;
  film: FilmType;
  seance: SeanceType;
  date: string;
};

function Booking() {
  const navigate = useNavigate();
  const { seanceId } = useParams();
  const location = useLocation();
  const [allData, setAllData] = useState<AllDataType>();
  const [selectedPlaces, setSelectedPlaces] = useState<SelectedPlace[]>([]);

  const { loading } = useFetchAllData({
    onFetchSuccess: (allData) => setAllData(allData),
  });

  const seance = (allData?.seances || []).find(
    (at) => at.id.toString() === seanceId,
  );

  const hall = (allData?.halls || []).find(
    (h) => h.id === seance?.seance_hallid,
  );

  const film = (allData?.films || []).find(
    (f) => f.id === seance?.seance_filmid,
  );

  const isSelected = (rowIndex: number, colIndex: number) => {
    return selectedPlaces.some(
      (at) => rowIndex === at.rowIndex && colIndex === at.colIndex,
    );
  };

  const getCoast = (placeType: HallPlaceType): number => {
    if (placeType === "disabled" || placeType === "taken") {
      throw Error("Error calculation place coast for type: " + placeType);
    }
    if (placeType === "vip") {
      return hall?.hall_price_vip ?? 0;
    } else {
      return hall?.hall_price_standart ?? 0;
    }
  };

  const handlePlaceClick = (
    rowIndex: number,
    colIndex: number,
    type: HallPlaceType,
  ) => {
    if (type === "disabled" || type === "taken") {
      return;
    }

    setSelectedPlaces((prev) =>
      isSelected(rowIndex, colIndex)
        ? prev.filter(
            // already selected, unselect
            (at) => at.rowIndex !== rowIndex || at.colIndex !== colIndex,
          )
        : [...prev, { rowIndex, colIndex, coast: getCoast(type) }],
    );
  };

  if (loading && !allData) {
    return <Spinner />;
  }

  if (!location.state || !seance || !film || !hall) {
    return <div>Данные не найдены. Вернитесь на главную страницу.</div>;
  }
  const { date } = location.state;

  return (
    <div className={styles.container}>
      <div className={styles.info}>
        <div className={styles.bold}>{film.film_name}</div>
        <Text type="secondary">Начало сеанса: {seance.seance_time}</Text>
        <div className={styles.bold}>{hall.hall_name}</div>
      </div>
      <BookingHall
        hall={hall}
        seanceId={seanceId ?? ""}
        onPlaceClick={handlePlaceClick}
        isSelected={isSelected}
        date={date}
      />
      <div className="d-flex justify-content-center p-4">
        <Button
          onClick={() => {
            if (!selectedPlaces.length) {
              return;
            }
            navigate("payment", {
              state: {
                selectedPlaces: selectedPlaces.map((place) => ({
                  ...place,
                  rowIndex: place.rowIndex + 1,
                  colIndex: place.colIndex + 1,
                })),
                hall,
                film,
                seance,
                date,
              } as BookingLocationState,
            });
          }}
        >
          ЗАБРОНИРОВАТЬ
        </Button>
      </div>
    </div>
  );
}

export default Booking;
