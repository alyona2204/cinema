import apiRequest from "./apiRequest";

export type TicketType = {
  id: number;
  ticket_date: string;
  ticket_time: string;
  ticket_filmname: string;
  ticket_hallname: string;
  ticket_row: number;
  ticket_place: number;
  ticket_price: number;
};

async function create(payload: {
  seanceId: number;
  ticketDate: string;
  tickets: {
    row: number;
    place: number;
    coast: number;
  }[];
}) {
  const formData = new FormData();
  formData.append("seanceId", payload.seanceId.toString());
  formData.append("ticketDate", payload.ticketDate);
  formData.append("tickets", JSON.stringify(payload.tickets));

  return apiRequest<{ tickets: TicketType[] }>("/ticket", {
    method: "POST",
    body: formData,
  });
}

export default {
  create,
};
