import { NextResponse } from "next/server";
import { getAllTables, getReservations } from "@/services/reservation.service";
import { formatReservationsByTimeSlot } from "@/helpers/reservation";

export async function GET() {
  try {
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

    return NextResponse.json({
      tables,
      reservations: formattedReservations,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch reservation data" },
      { status: 500 }
    );
  }
}
