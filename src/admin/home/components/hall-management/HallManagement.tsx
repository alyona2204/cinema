import { useState } from "react";
import api from "../../../../api/api";
import type { HallType } from "../../../../api/hall";
import Button from "../../../../components/button/Button";
import Modal from "../../../../components/modal/Modal";
import styles from "./hall-management.module.css";
import Input from "../../../../components/form/input/Input";
import ContentSection from "../content-section/ContentSection";
import type { SeanceType } from "../../../../api/seance";
import DeleteButton from "../delete-button/DeleteButton";

function HallManagement(props: {
  halls: HallType[];
  onHallDelete?: (result?: {
    halls: HallType[];
    seances: SeanceType[];
  }) => void;
  onHallCreate?: (result?: { halls: HallType[] }) => void;
}) {
  const [modalOpen, setModalOpen] = useState(false);
  const [hallName, setHallName] = useState("");

  // TODO: disable buttons if loading

  const createHall = async () => {
    try {
      const response = await api.hall.create(hallName);
      if (response.success) {
        props.onHallCreate?.(response.result);
        setModalOpen(false);
      } else {
        throw Error(response.error);
      }
    } catch (error) {
      console.error("Create hall error:", error);
    }
  };

  const deleteHall = async (id: number) => {
    try {
      const response = await api.hall.remove(id);
      if (response.success) {
        props.onHallDelete?.(response.result);
      } else {
        throw Error(response.error);
      }
    } catch (error) {
      console.error("Delete hall error:", error);
    }
  };

  return (
    <ContentSection title="Доступные залы:">
      <ul className={styles.list}>
        {props.halls.map((hall) => (
          <li key={hall.id} className={styles.item}>
            <span>- {hall.hall_name}</span>
            <DeleteButton onClick={() => deleteHall(hall.id)} />
          </li>
        ))}
      </ul>
      <Button onClick={() => setModalOpen(true)}>СОЗДАТЬ ЗАЛ</Button>
      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title="ДОБАВЛЕНИЕ ЗАЛА"
        okButtonText={"ДОБАВИТЬ ЗАЛ"}
        onOk={createHall}
      >
        <Input
          placeholder="Например, «Зал 1»"
          label="Название зала"
          onChange={(value) => setHallName(value)}
        />
      </Modal>
    </ContentSection>
  );
}

export default HallManagement;
