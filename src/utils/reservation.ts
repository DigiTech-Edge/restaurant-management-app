import { Reservation } from "@/types/reservation.types";
import { format, parse } from "date-fns";

type TimeSlot = "morning" | "afternoon" | "evening";

interface FormattedReservation {
  customerName: string;
  firstName: string;
  surname: string;
  title: string;
  phoneNumber: string;
  time: string;
  tableId: string;
  persons: number;
}

interface ReservationsByTimeSlot {
  morning: FormattedReservation[];
  afternoon: FormattedReservation[];
  evening: FormattedReservation[];
}

export function formatReservationsByTimeSlot(
  reservations: Reservation[]
): ReservationsByTimeSlot {
  const result: ReservationsByTimeSlot = {
    morning: [],
    afternoon: [],
    evening: [],
  };

  reservations.forEach((reservation) => {
    const time = parse(reservation.time, "HH:mm", new Date());
    const formattedTime = format(time, "h:mma").toLowerCase();
    const hour = time.getHours();

    const formattedReservation: FormattedReservation = {
      customerName: `${reservation.name}`,
      firstName: reservation.name.split(" ")[0] || "",
      surname: reservation.name.split(" ").slice(1).join(" ") || "",
      title: "Mr", // Default title since it's not in the API
      phoneNumber: reservation.phone,
      time: formattedTime,
      tableId: reservation.tableId,
      persons: reservation.numberOfGuests,
    };

    // Categorize based on time
    if (hour < 12) {
      result.morning.push(formattedReservation);
    } else if (hour < 17) {
      result.afternoon.push(formattedReservation);
    } else {
      result.evening.push(formattedReservation);
    }
  });

  // Sort each time slot by time
  const sortByTime = (a: FormattedReservation, b: FormattedReservation) => {
    const timeA = parse(a.time, "h:mma", new Date());
    const timeB = parse(b.time, "h:mma", new Date());
    return timeA.getTime() - timeB.getTime();
  };

  result.morning.sort(sortByTime);
  result.afternoon.sort(sortByTime);
  result.evening.sort(sortByTime);

  return result;
}
