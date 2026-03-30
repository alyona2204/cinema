import { useState } from "react";
import Button from "../../../../components/button/Button";
import styles from "./seance-grid.module.css";
import api from "../../../../api/api";
import type { FilmType } from "../../../../api/film";
import Film from "./film/Film";
import type { SeanceType } from "../../../../api/seance";
import type { HallType } from "../../../../api/hall";
import Timeline from "./timeline/Timeline";
import SeanceModal, { type SeanceDataType } from "./seance-modal/SeanceModal";
import FilmModal, { type FilmDataType } from "./film-modal/FilmModal";

function SeanceGrid(props: {
  films?: FilmType[];
  seances?: SeanceType[];
  halls?: HallType[];
  onFilmCreate: (result?: { films?: FilmType[] }) => void;
  onFilmDelete: (result?: {
    films?: FilmType[];
    seances?: SeanceType[];
  }) => void;
  onSeanceCreate: (result?: { seances?: SeanceType[] }) => void;
  onSeanceDelete: (result?: { seances?: SeanceType[] }) => void;
}) {
  const [loading, setLoading] = useState(false);
  const [filmModalOpen, setFilmModalOpen] = useState(false);
  const [seanceData, setSeanceData] = useState<SeanceDataType>();

  const createFilm = async (payload: FilmDataType) => {
    setLoading(true);
    try {
      const response = await api.film.create(payload);
      if (response.success) {
        props.onFilmCreate?.(response.result);
        setFilmModalOpen(false);
      } else {
        throw Error(response.error);
      }
    } catch (error) {
      console.error("Error creating film:", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteFilm = async (id: number) => {
    setLoading(true);
    try {
      const response = await api.film.remove(id);
      if (response.success) {
        props.onFilmDelete?.(response.result);
      } else {
        throw Error(response.error);
      }
    } catch (error) {
      console.error("Error deleting film:", error);
    } finally {
      setLoading(false);
    }
  };

  const createSeance = async () => {
    if (!seanceData) {
      return;
    }
    setLoading(true);
    try {
      const response = await api.seance.create(seanceData);
      if (response.success) {
        props.onSeanceCreate?.(response.result);
        setSeanceData(undefined);
      } else {
        throw Error(response.error);
      }
    } catch (error) {
      console.error("Error creating seance:", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteSeance = async (id: number) => {
    setLoading(true);
    try {
      const response = await api.seance.remove(id);
      if (response.success) {
        props.onSeanceDelete?.(response.result);
      } else {
        throw Error(response.error);
      }
    } catch (error) {
      console.error("Error deleting seance:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="d-flex flex-column align-items-start gap-3">
        <Button onClick={() => setFilmModalOpen(true)}>ДОБАВИТЬ ФИЛЬМ</Button>
        <div className={styles.films}>
          {props.films?.map((film) => (
            <Film
              draggable={true}
              key={film.id}
              film={film}
              onDelete={() => deleteFilm(film.id)}
              disabled={loading}
              onDragStart={(e) =>
                e.dataTransfer.setData("filmId", film.id.toString())
              }
            />
          ))}
        </div>
      </div>

      <div className={styles.seances}>
        {props.halls?.map((hall) => {
          const hallSeances = props.seances?.filter(
            (s) => s.seance_hallid === hall.id,
          );

          return (
            <Timeline
              key={hall.id}
              title={hall.hall_name || `Зал ${hall.id}`}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                const dropedFilmId = e.dataTransfer.getData("filmId");
                if (!dropedFilmId) {
                  return;
                }
                setSeanceData({
                  seanceFilmid: Number(dropedFilmId),
                  seanceHallid: hall.id,
                  seanceTime: "",
                });
              }}
              seances={hallSeances || []}
              films={props.films || []}
              onSeanceDelete={deleteSeance}
            />
          );
        })}
      </div>
      <SeanceModal
        open={!!seanceData}
        onClose={() => setSeanceData(undefined)}
        halls={props.halls || []}
        films={props.films || []}
        onChange={(key, vlue) => {
          if (seanceData) {
            setSeanceData({ ...seanceData, [key]: vlue });
          }
        }}
        data={seanceData}
        disabled={loading}
        onOk={createSeance}
      />
      <FilmModal
        disabled={loading}
        open={filmModalOpen}
        onClose={() => setFilmModalOpen(false)}
        onOk={(data) => createFilm(data)}
      />
    </div>
  );
}

export default SeanceGrid;
