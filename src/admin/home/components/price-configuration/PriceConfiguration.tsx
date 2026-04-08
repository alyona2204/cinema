import { useState } from "react";
import type { HallType } from "../../../../api/hall";
import Segments from "../../../../components/segments/Segments";
import ContentSection from "../content-section/ContentSection";
import styles from "./price-configuration.module.css";
import InputNumber from "../../../../components/form/input-number/InputNumber";
import HallPlace from "../../../../components/hall/place/HallPlace";
import Button from "../../../../components/button/Button";
import Text from "../../../../components/typography/text/Text";
import api from "../../../../api/api";

type DataType = {
  priceStandart: number;
  priceVip: number;
};

function PriceConfiguration(props: {
  halls: HallType[];
  onPriceUpdate?: (hall?: HallType) => void;
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
    setData({ ...data, [key]: value });
  };

  const handleSave = async () => {
    if (!activeSegmentKey) {
      return;
    }
    setLoading(true);
    try {
      const response = await api.price.modify(activeSegmentKey, data);
      if (response.success) {
        props.onPriceUpdate?.(response.result);
      } else {
        throw Error(response.error);
      }
    } catch (error) {
      console.error("Error saving price:", error);
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
      <ContentSection
        style={{ width: "100%" }}
        title="Установите цены для типов кресел:"
      >
        <div className="d-flex gap-2 align-items-end">
          <InputNumber
            value={data.priceStandart}
            style={{ width: 100 }}
            label="Цена, рублей"
            onChange={(value) => handleChange("priceStandart", value)}
            min={1}
          />
          <Text
            type="secondary"
            className="d-flex gap-2 align-items-center pb-2"
          >
            за <HallPlace type="standart" /> обычные кресла
          </Text>
        </div>
        <div className="d-flex gap-2 align-items-end">
          <InputNumber
            value={data.priceVip}
            style={{ width: 100 }}
            label="Цена, рублей"
            onChange={(value) => handleChange("priceVip", value)}
            min={1}
          />
          <Text
            type="secondary"
            className="d-flex gap-2 align-items-center pb-2"
          >
            за <HallPlace type="vip" /> vip кресла
          </Text>
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

function createData(hall?: HallType) {
  const { hall_price_standart = 0, hall_price_vip = 0 } = hall || {};
  return {
    priceStandart: hall_price_standart,
    priceVip: hall_price_vip,
  };
}

export default PriceConfiguration;
