import { useRef, useState, type ReactNode } from "react";
import Modal from "../../../../../components/modal/Modal";
import Input from "../../../../../components/form/input/Input";
import Button from "../../../../../components/button/Button";
import Text from "../../../../../components/typography/text/Text";
import styles from "./film-modal.module.css";
import InputNumber from "../../../../../components/form/input-number/InputNumber";

export type FilmDataType = {
  filmName: string;
  filmDuration: string;
  filmDescription: string;
  filmOrigin: string;
  filePoster?: File;
};

type FieldType = {
  key: keyof Omit<FilmDataType, "filePoster">;
  label: string;
  placeholder?: string;
  render?: (field: FieldType) => ReactNode;
};

function FilmModal(props: {
  open: boolean;
  onClose: () => void;
  onOk?: (data: FilmDataType) => void;
  disabled?: boolean;
}) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [data, setData] = useState<FilmDataType>({
    filmName: "",
    filmDuration: "1",
    filmDescription: "",
    filmOrigin: "",
    filePoster: undefined,
  });

  const onChange = <K extends keyof FilmDataType>(
    key: K,
    value: FilmDataType[K],
  ) => {
    setData({ ...data, [key]: value });
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      return;
    }
    setData({ ...data, filePoster: file });
  };

  const fields: FieldType[] = [
    {
      key: "filmName",
      label: "Название фильма",
      placeholder: "Например, «Гражданин Кейн»",
    },
    {
      key: "filmDuration",
      label: "Продолжительность фильма(мин)",
      render: (field) => (
        <InputNumber
          value={Number(data[field.key])}
          label={field.label}
          key={field.key}
          onChange={(value) => onChange(field.key, value.toString())}
          min={1}
        />
      ),
    },
    { key: "filmDescription", label: "Описание фильма" },
    { key: "filmOrigin", label: "Страна" },
  ];

  return (
    <Modal
      {...props}
      onOk={() => props.onOk?.(data)}
      extraAction={
        <Button
          disabled={props.disabled}
          onClick={() => fileInputRef.current?.click()}
        >
          ЗАГРУЗИТЬ ПОСТЕР
        </Button>
      }
      title="ДОБАВЛЕНИЕ ФИЛЬМА"
      okButtonText={"ДОБАВИТЬ ФИЛЬМ"}
    >
      {fields.map((field) => {
        if (field.render) {
          return field.render(field);
        }
        return (
          <Input
            value={data[field.key]}
            label={field.label}
            key={field.key}
            onChange={(value) => onChange(field.key, value)}
          />
        );
      })}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/png"
        onChange={onFileChange}
        className={styles.fileInput}
      />
      {data.filePoster && (
        <div className={styles.posterPreview}>
          <Text type="secondary">Постер: {data.filePoster.name}</Text>
        </div>
      )}
    </Modal>
  );
}

export default FilmModal;
