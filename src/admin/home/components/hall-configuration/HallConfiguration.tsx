import { useState } from "react";
import type { HallPlaceType, HallType } from "../../../../api/hall";
import Segments from "../../../../components/segments/Segments";
import styles from "./hall-configuration.module.css";
import InputNumber from "../../../../components/form/input-number/InputNumber";
import ContentSection from "../content-section/ContentSection";
import Hall from "../../../../components/hall/Hall";
import HallPlace from "../../../../components/hall/place/HallPlace";
import Text from "../../../../components/typography/text/Text";
import Button from "../../../../components/button/Button";
import api from "../../../../api/api";

type DataType = {
  rowCount: number;
  placeCount: number;
  hallGrid: HallPlaceType[][];
};

const placeChangeQueue: HallPlaceType[] = ["standart", "vip", "disabled"];

function HallConfiguration(props: {
  halls: HallType[];
  onHallUpdate?: (hall?: HallType) => void;
}) {
  const defaultActiveHall = props.halls[0];

  const [activeSegmentKey, setActiveSegmentKey] = useState<number | undefined>(
    defaultActiveHall?.id,
  );
  const [data, setData] = useState<DataType>(createData(defaultActiveHall));
  const [loading, setLoading] = useState(false);

  const handleSegmentChange = (key: number) => {
    setActiveSegmentKey(key);
    setData(createData(props.halls.find((hall) => hall.id === key)));
  };

  const handleChange = <K extends keyof DataType>(
    key: K,
    value: DataType[K],
  ) => {
    const newData = { ...data, [key]: value };
    setData({
      ...newData,
      hallGrid: buildHallGrid(
        newData.rowCount,
        newData.placeCount,
        newData.hallGrid,
      ),
    });
  };

  const handleSave = async () => {
    if (!activeSegmentKey) {
      return;
    }
    setLoading(true);
    try {
      const response = await api.hall.modifyConfig(activeSegmentKey, {
        placeCount: data.placeCount,
        rowCount: data.rowCount,
        config: data.hallGrid,
      });
      if (response.success) {
        props.onHallUpdate?.(response.result);
      } else {
        throw Error(response.error);
      }
    } catch (error) {
      console.error("Error saving config:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    // reset changes
    setData(
      createData(props.halls.find((hall) => hall.id === activeSegmentKey)),
    );
  };

  const handlePlaceClick = (rowIndex: number, colIndex: number) => {
    // Cycles through place types in the order declared in 'placeChangeQueue' (e.g. standart → vip → disabled → standart -> ...) on click
    const newGrid = data.hallGrid.map((row) => [...row]); // deep clone
    const currentType = newGrid[rowIndex][colIndex];
    const nextType =
      placeChangeQueue[
        (placeChangeQueue.indexOf(currentType) + 1) % placeChangeQueue.length
      ];
    newGrid[rowIndex][colIndex] = nextType;
    setData({ ...data, hallGrid: newGrid });
  };

  return (
    <div className={styles.container}>
      <ContentSection title="Выберите зал для конфигурации:">
        <Segments
          items={props.halls.map((hall) => ({
            key: hall.id,
            caption: hall.hall_name,
          }))}
          onChange={handleSegmentChange}
          activeKey={activeSegmentKey}
          disabled={loading}
        />
      </ContentSection>
      <ContentSection title="Укажите количество рядов и максимальное количество кресел в ряду:">
        <div className="d-flex gap-3">
          <InputNumber
            style={{ width: "100px" }}
            label="Рядов, шт"
            value={data.rowCount}
            onChange={(value) => handleChange("rowCount", value)}
            min={1}
            max={20}
          />
          <span className="d-flex align-items-end pb-2">X</span>
          <InputNumber
            style={{ width: "100px" }}
            label="Мест, шт"
            value={data.placeCount}
            onChange={(value) => handleChange("placeCount", value)}
            min={1}
            max={15}
          />
        </div>
      </ContentSection>
      <ContentSection
        title="Теперь вы можете указать типы кресел на схеме зала:"
        style={{ width: "100%" }}
      >
        <div className="d-flex gap-4 flex-wrap">
          <div className="d-flex gap-2 align-items-center">
            <HallPlace type="standart" />
            <Text type="secondary">- Обычные кресла</Text>
          </div>
          <div className="d-flex gap-2 align-items-center">
            <HallPlace type="vip" /> <Text type="secondary">- VIP кресла</Text>
          </div>
          <div className="d-flex gap-2 align-items-center">
            <HallPlace type="disabled" />
            <Text type="secondary">- Заблокированые(нет кресла)</Text>
          </div>
        </div>
        <Text type="secondary">
          Чтобы изменить вид кресла, нажмите по нему левой кнопкой мыши
        </Text>
        <div className={styles.hall}>
          <Hall
            grid={data.hallGrid}
            renderScreen={() => (
              <span style={{ letterSpacing: 19 }}>ЭКРАН</span>
            )}
            onPlaceClick={handlePlaceClick}
          />
        </div>
      </ContentSection>
      <div className={styles.buttons}>
        <Button type="secondary" onClick={handleCancel} disabled={loading}>
          ОТМЕНА
        </Button>
        <Button onClick={handleSave} disabled={loading}>
          СОХРАНИТЬ
        </Button>
      </div>
    </div>
  );
}

function buildHallGrid(rows: number, cols: number, config: HallPlaceType[][]) {
  const grid: HallPlaceType[][] = [];

  for (let i = 0; i < rows; i++) {
    const row: HallPlaceType[] = [];
    for (let j = 0; j < cols; j++) {
      row.push(config?.[i]?.[j] ?? "standart");
    }
    grid.push(row);
  }

  return grid;
}

function createData(hall?: HallType) {
  const { hall_rows = 0, hall_places = 0, hall_config = [] } = hall || {};
  return {
    rowCount: hall_rows,
    placeCount: hall_places,
    hallGrid: buildHallGrid(hall_rows, hall_places, hall_config),
  };
}

export default HallConfiguration;
