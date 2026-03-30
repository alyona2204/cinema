import { useState } from "react";
import Accordion, {
  type AccordionItem,
} from "./components/accordion/Accordion";
import type { HallType } from "../../api/hall";
import HallManagement from "./components/hall-management/HallManagement";
import HallConfiguration from "./components/hall-configuration/HallConfiguration";
import Spinner from "../../components/spinner/Spinner";
import PriceConfiguration from "./components/price-configuration/PriceConfiguration";
import SeanceGrid from "./components/seance-grid/SeanceGrid";
import type { AllDataType } from "../../api/all-data";
import OpenSales from "./components/open-sales/OpenSales";
import useFetchAllData from "../../hooks/use-fetch-all-data/useFetchAllData";

function Home() {
  const [allData, setAllData] = useState<AllDataType>();

  const { loading } = useFetchAllData({
    onFetchSuccess: (allData) => setAllData(allData),
  });

  const onHallUpdate = (modifiedHall?: HallType) => {
    setAllData({
      ...allData,
      halls: (allData?.halls || []).map((hall) =>
        hall.id === modifiedHall?.id ? modifiedHall : hall,
      ),
    });
  };

  const items: AccordionItem[] = [
    {
      header: "УПРАВЛЕНИЕ ЗАЛАМИ",
      content: (
        <HallManagement
          halls={allData?.halls || []}
          onHallDelete={(result) => setAllData({ ...allData, ...result })}
          onHallCreate={(result) => setAllData({ ...allData, ...result })}
        />
      ),
      key: "1",
    },
    {
      header: "КОНФИГУРАЦИЯ ЗАЛОВ",
      content: (
        <HallConfiguration
          halls={allData?.halls || []}
          onHallUpdate={onHallUpdate}
        />
      ),
      key: "2",
    },
    {
      header: "КОНФИГУРАЦИЯ ЦЕН",
      content: (
        <PriceConfiguration
          halls={allData?.halls || []}
          onPriceUpdate={onHallUpdate}
        />
      ),
      key: "3",
    },
    {
      header: "СЕТКА СЕАНСОВ",
      content: (
        <SeanceGrid
          films={allData?.films}
          seances={allData?.seances}
          halls={allData?.halls}
          onFilmCreate={(result) => setAllData({ ...allData, ...result })}
          onFilmDelete={(result) => setAllData({ ...allData, ...result })}
          onSeanceCreate={(result) => setAllData({ ...allData, ...result })}
          onSeanceDelete={(result) => setAllData({ ...allData, ...result })}
        />
      ),
      key: "4",
    },
    {
      header: "ОТКРЫТЬ ПРОДАЖИ",
      content: (
        <OpenSales
          halls={allData?.halls}
          onHallUpdate={(result) => setAllData({ ...allData, ...result })}
        />
      ),
      key: "5",
    },
  ];

  if (loading && !allData) {
    return <Spinner color="#ffffff" />;
  }

  return (
    <section>
      <Accordion
        items={items}
        defaultOpenKeys={items.map((item) => item.key)}
      />
    </section>
  );
}

export default Home;
