import apiRequest from "./apiRequest";
import type { SeanceType } from "./seance";

export type FilmType = {
  id: number;
  film_name: string;
  film_duration: number;
  film_description: string;
  film_origin: string;
  film_poster: string;
};

async function create(payload: {
  filmName: string;
  filmDuration: string;
  filmDescription: string;
  filmOrigin: string;
  filePoster?: File;
}) {
  const formData = new FormData();
  formData.append("filmName", payload.filmName);
  formData.append("filmDuration", payload.filmDuration);
  formData.append("filmDescription", payload.filmDescription);
  formData.append("filmOrigin", payload.filmOrigin);
  if (payload.filePoster) {
    formData.append("filePoster", payload.filePoster);
  }

  return apiRequest<{ films: FilmType[] }>("/film", {
    method: "POST",
    body: formData,
  });
}

async function remove(id: number) {
  return apiRequest<{ films: FilmType[]; seances: SeanceType[] }>(
    `/film/${id}`,
    {
      method: "DELETE",
    },
  );
}

export default {
  create,
  remove,
};
