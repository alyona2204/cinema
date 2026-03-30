import { useState } from "react";
import type { HallType } from "../../../../api/hall";
import Segments from "../../../../components/segments/Segments";
import ContentSection from "../content-section/ContentSection";
import styles from "./open-sales.module.css";
import Button from "../../../../components/button/Button";
import api from "../../../../api/api";

function OpenSales(props: {
  halls?: HallType[];
  onHallUpdate?: (result?: { halls?: HallType[] }) => void;
}) {
  const defaultActiveHall = props.halls?.[0];

  const [loading, setLoading] = useState(false);
  const [activeSegmentKey, setActiveSegmentKey] = useState<number | undefined>(
    defaultActiveHall?.id,
  );

  const activeHall = props.halls?.find((hall) => hall.id === activeSegmentKey);

  const isHallOpen = activeHall?.hall_open === 1;

  const openCloseHall = async (hallOpen: number) => {
    if (!activeHall) {
      return;
    }
    setLoading(true);
    try {
      const response = await api.hall.open(activeHall.id, { hallOpen });
      if (response.success) {
        props.onHallUpdate?.(response.result);
      } else {
        throw Error(response.error);
      }
    } catch (error) {
      console.error("Error open/close hall:", error);
    } finally {
      setLoading(false);
    }
  };

  const getHallStatus = () => {
    if (!activeHall) {
      return null;
    }
    if (isHallOpen) {
      return "Зал открыт";
    }
    return "Всё готово к открытию";
  };

  const getOpenCloseButton = () => {
    if (!activeHall) {
      return null;
    }
    if (isHallOpen) {
      return (
        <Button disabled={loading} onClick={() => openCloseHall(0)}>
          ЗАКРЫТЬ ПРОДАЖУ БИЛЕТОВ
        </Button>
      );
    }
    return (
      <Button disabled={loading} onClick={() => openCloseHall(1)}>
        ОТКРЫТЬ ПРОДАЖУ БИЛЕТОВ
      </Button>
    );
  };

  return (
    <div className={styles.container}>
      <ContentSection title={"Выбирите залл для открытия/закрытия продаж:"}>
        <Segments
          items={(props.halls || []).map((hall) => ({
            key: hall.id,
            caption: hall.hall_name,
          }))}
          onChange={setActiveSegmentKey}
          activeKey={activeSegmentKey}
          disabled={loading}
        />
      </ContentSection>
      <div className="d-flex justify-content-center w-100">
        {getHallStatus()}
      </div>
      <div className="d-flex justify-content-center w-100">
        {getOpenCloseButton()}
      </div>
    </div>
  );
}

export default OpenSales;
