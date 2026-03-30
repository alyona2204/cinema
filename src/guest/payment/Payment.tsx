import { useLocation, useNavigate } from "react-router-dom";
import type { BookingLocationState, SelectedPlace } from "../booking/Booking";
import Button from "../../components/button/Button";
import PaymentLayout from "../components/payment-layout/PaymentLayout";
import { useState } from "react";
import api from "../../api/api";
import moment from "moment";
import type { TicketLocationState } from "../ticket/Ticket";

function Payment() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const { state } = useLocation();

  if (!state) {
    return <div>Данные не найдены. Вернитесь на страницу бронирования.</div>;
  }

  const { selectedPlaces, seance, film, hall } = state as BookingLocationState;

  const calculateCost = () => {
    let coast = 0;
    for (const place of selectedPlaces) {
      coast += place.coast;
    }

    return coast;
  };

  const handlePayment = async () => {
    setLoading(true);
    try {
      const response = await api.ticket.create({
        seanceId: seance.id,
        ticketDate: moment().format("YYYY-MM-DD"),
        tickets: selectedPlaces.map((p) => ({
          row: p.rowIndex,
          place: p.colIndex,
          coast: p.coast,
        })),
      });
      if (response.success) {
        navigate(`/booking/${seance.id}/ticket`, {
          state: { ...state, tickets: response.result } as TicketLocationState,
        });
      } else {
        throw Error(response.error);
      }
    } catch (error) {
      console.error("Error creating ticket:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <PaymentLayout
      title="ВЫ ВЫБРАЛИ БИЛЕТЫ:"
      info={{
        filmName: film.film_name,
        places: selectedPlaces.map(({ colIndex }: SelectedPlace) => colIndex),
        hallName: hall.hall_name ?? "",
        seanceTime: seance.seance_time ?? "",
        cost: calculateCost(),
      }}
      footer={
        <div>
          <div>
            После оплаты билет будет доступен в этом окне, а также придёт вам на
            почту. Покажите QR-код нашему контроллёру у входа в зал.
          </div>
          <div>Приятного просмотра!</div>
        </div>
      }
    >
      <Button disabled={loading} onClick={handlePayment}>
        ПОЛУЧИТЬ КОД БРОНИРОВАНИЯ
      </Button>
    </PaymentLayout>
  );
}

export default Payment;
