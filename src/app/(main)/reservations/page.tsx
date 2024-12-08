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
    isReserved: table.reservations && table.reservations.length > 0,
    number: table.number,
  }));

  // Process all reservations
  const reservations = reservationsResponse.reservations || [];

  // Format all reservations into morning, afternoon, evening slots
  const formattedReservations = formatReservationsByTimeSlot(reservations);

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
