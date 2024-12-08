import { Suspense } from "react";
import { getAllTables, getReservations } from "@/services/reservation.service";
import ReservationsClient from "@/components/pages/reservations/ReservationsClient";
import PageHeader from "@/components/global/PageHeader";
import { formatReservationsByTimeSlot } from "@/utils/reservation";

export default async function ReservationsPage() {
  const [tablesResponse, reservationsResponse] = await Promise.all([
    getAllTables(),
    getReservations(),
  ]);

  const tables = (tablesResponse.tables || []).map((table) => ({
    id: table.id,
    capacity: table.capacity,
    isReserved: false,
    number: table.number,
  }));

  // Process reservations and mark tables as reserved
  const reservations = reservationsResponse.reservations || [];
  const currentDate = new Date();
  const todaysReservations = reservations.filter((res) => {
    const resDate = new Date(res.date);
    return resDate.toDateString() === currentDate.toDateString();
  });

  // Mark tables as reserved if they have a reservation today
  todaysReservations.forEach((res) => {
    const table = tables.find((t) => t.id === res.tableId);
    if (table) {
      table.isReserved = true;
    }
  });

  // Format reservations into morning, afternoon, evening slots
  const formattedReservations =
    formatReservationsByTimeSlot(todaysReservations);

  return (
    <div>
      <PageHeader title="Reservations" />
      <Suspense fallback={<div>Loading...</div>}>
        <ReservationsClient
          tables={tables}
          reservations={formattedReservations}
        />
      </Suspense>
    </div>
  );
}
