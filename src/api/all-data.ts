import apiRequest from "./apiRequest";
import type { FilmType } from "./film";
import type { HallType } from "./hall";
import type { SeanceType } from "./seance";

export type AllDataType = {
  halls?: HallType[];
  films?: FilmType[];
  seances?: SeanceType[];
};

async function get() {
  return apiRequest<AllDataType>("/alldata");
}

export default {
  get,
};
