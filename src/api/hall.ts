import apiRequest from "./apiRequest";
import type { SeanceType } from "./seance";

export type HallPlaceType = "standart" | "vip" | "taken" | "disabled";

export type HallType = {
  id: number;
  hall_name?: string;
  hall_rows?: number;
  hall_places?: number;
  hall_config?: HallPlaceType[][];
  hall_price_standart?: number;
  hall_price_vip?: number;
  hall_open?: number;
};

async function create(hallName: string) {
  const formData = new FormData();
  formData.set("hallName", hallName);

  return apiRequest<{ halls: HallType[] }>("/hall", {
    method: "POST",
    body: formData,
  });
}

async function remove(id: number) {
  return apiRequest<{
    halls: HallType[];
    seances: SeanceType[];
  }>(`/hall/${id}`, { method: "DELETE" });
}

async function modifyConfig(
  id: number,
  payload: { rowCount: number; placeCount: number; config: HallPlaceType[][] },
) {
  const formData = new FormData();
  formData.set("rowCount", payload.rowCount.toString());
  formData.set("placeCount", payload.placeCount.toString());
  formData.set("config", JSON.stringify(payload.config));

  return apiRequest<HallType>(`/hall/${id}`, {
    method: "POST",
    body: formData,
  });
}

async function open(id: number, payload: { hallOpen: number }) {
  const formData = new FormData();
  formData.set("hallOpen", payload.hallOpen.toString());

  return apiRequest<{ halls: HallType[] }>(`/open/${id}`, {
    method: "POST",
    body: formData,
  });
}

export default {
  create,
  remove,
  modifyConfig,
  open,
};
