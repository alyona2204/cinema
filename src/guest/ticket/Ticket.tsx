import { useLocation } from "react-router-dom";
import type { TicketType } from "../../api/ticket";
import type { BookingLocationState, SelectedPlace } from "../booking/Booking";
import PaymentLayout from "../components/payment-layout/PaymentLayout";
import { QRCodeSVG } from "qrcode.react";

export type TicketLocationState = BookingLocationState & {
  tickets: TicketType[];
};

function Ticket() {
  const { state } = useLocation();

  if (!state) {
    return <div>Данные не найдены. Вернитесь на страницу бронирования.</div>;
  }

  const { selectedPlaces, seance, film, hall, tickets } =
    state as TicketLocationState;

  console.log(tickets);

  const qrData = JSON.stringify({
    film: film.id,
    seanceTime: seance.seance_time,
    hall: hall.id,
    places: selectedPlaces.map((p) => p.colIndex),
    timestamp: new Date().toISOString(),
  });

  return (
    <PaymentLayout
      title="ЭЛЕКТРОННЫЙ БИЛЕТ"
      info={{
        filmName: film.film_name,
        places: selectedPlaces.map(({ colIndex }: SelectedPlace) => colIndex),
        hallName: hall.hall_name ?? "",
        seanceTime: seance.seance_time ?? "",
      }}
      footer={
        <div>
          <div>
            Покажите QR-код нашему контроллеру для подтверждения бронирования.
          </div>
          <div>Приятного просмотра!</div>
        </div>
      }
    >
      <QRCodeSVG value={qrData} size={200} level="H" />
    </PaymentLayout>
  );
}

export default Ticket;
