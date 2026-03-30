import Modal from "../../../../../components/modal/Modal";
import Select from "../../../../../components/form/select/Select";
import type { HallType } from "../../../../../api/hall";
import type { FilmType } from "../../../../../api/film";
import TimePicker from "../../../../../components/form/time-picker/TimePicker";

export type SeanceDataType = {
  seanceHallid: number;
  seanceFilmid: number;
  seanceTime: string;
};

function SeanceModal(props: {
  open: boolean;
  onClose: () => void;
  onOk?: () => void;
  disabled?: boolean;
  halls: HallType[];
  films: FilmType[];
  onChange: <K extends keyof SeanceDataType>(
    key: K,
    value: SeanceDataType[K],
  ) => void;
  data?: SeanceDataType;
}) {
  return (
    <Modal
      {...props}
      onOk={() => props.onOk?.()}
      title="ДОБАВЛЕНИЕ СЕАНСА"
      okButtonText={"ДОБАВИТЬ СЕАНС"}
    >
      <Select
        options={props.halls.map((hall) => ({
          key: hall.id,
          value: hall.id.toString(),
          text: hall.hall_name ?? "",
        }))}
        label="Название зала"
        onChange={(value) => props.onChange("seanceHallid", Number(value))}
        value={props.data?.seanceHallid?.toString() ?? ""}
      />
      <Select
        options={props.films.map((film) => ({
          key: film.id,
          value: film.id.toString(),
          text: film.film_name ?? "",
        }))}
        label="Название фильма"
        onChange={(value) => props.onChange("seanceFilmid", Number(value))}
        value={props.data?.seanceFilmid?.toString() ?? ""}
      />
      <TimePicker
        onChange={(value) => props.onChange("seanceTime", value)}
        value={props.data?.seanceTime}
        label="Время начала"
      />
    </Modal>
  );
}

export default SeanceModal;
