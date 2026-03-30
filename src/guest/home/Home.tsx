import { useState } from "react";
import type { AllDataType } from "../../api/all-data";
import Spinner from "../../components/spinner/Spinner";
import useFetchAllData from "../../hooks/use-fetch-all-data/useFetchAllData";
import DatePicker from "./components/date-picker/DatePicker";
import Film from "./components/film/Film";
import styles from "./home.module.css";
import moment from "moment";

function Home() {
  const [allData, setAllData] = useState<AllDataType>();

  const today = moment().format("YYYY-MM-DD");
  const [selectedDate, setSelectedDate] = useState<string>(today);

  const { loading } = useFetchAllData({
    onFetchSuccess: (allData) => setAllData(allData),
  });

  if (loading && !allData) {
    return <Spinner />;
  }

  return (
    <div>
      <DatePicker
        value={selectedDate}
        onChange={(value) => setSelectedDate(value)}
      />
      <div className={styles.films}>
        {allData?.films?.map((film) => (
          <Film
            key={film.id}
            film={film}
            halls={(allData.halls || []).filter((hall) => hall.hall_open)}
            seances={(allData.seances || []).filter(
              (seance) => seance.seance_filmid === film.id,
            )}
            selectedDate={selectedDate}
          />
        ))}
      </div>
    </div>
  );
}

export default Home;
