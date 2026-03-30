import apiRequest from "./apiRequest";
import type { HallPlaceType } from "./hall";

export type SeanceType = {
  id: number;
  seance_filmid: number;
  seance_hallid: number;
  seance_time: string;
};

async function create(payload: {
  seanceHallid: number;
  seanceFilmid: number;
  seanceTime: string;
}) {
  const formData = new FormData();
  formData.set("seanceHallid", payload.seanceHallid.toString());
  formData.set("seanceFilmid", payload.seanceFilmid.toString());
  formData.set("seanceTime", payload.seanceTime);

  return apiRequest<{ seances: SeanceType[] }>("/seance", {
    method: "POST",
    body: formData,
  });
}

async function remove(id: number) {
  return apiRequest<{ seances: SeanceType[] }>(`/seance/${id}`, {
    method: "DELETE",
  });
}

async function getHallConfig(seanceId: string, date: string) {
  return apiRequest<HallPlaceType[][]>(
    `/hallconfig?seanceId=${seanceId}&date=${date}`,
  );
}

export default {
  create,
  remove,
  getHallConfig,
};
