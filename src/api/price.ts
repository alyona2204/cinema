import apiRequest from "./apiRequest";
import type { HallType } from "./hall";

async function modify(
  hallId: number,
  payload: { priceStandart: number; priceVip: number },
) {
  const formData = new FormData();
  formData.set("priceStandart", payload.priceStandart.toString());
  formData.set("priceVip", payload.priceVip.toString());

  return apiRequest<HallType>(`/price/${hallId}`, {
    method: "POST",
    body: formData,
  });
}

export default {
  modify,
};
