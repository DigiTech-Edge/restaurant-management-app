"use client";

import useSWR from "swr";
import ReservationsClient from "./ReservationsClient";
import { Spinner } from "@nextui-org/react";
import { getAllTables, getReservations } from "@/services/reservation.service";
import { formatReservationsByTimeSlot } from "@/helpers/reservation";
import toast from "react-hot-toast";
import { Table, Reservation } from "@/types/reservation.types";

const fetchReservationData = async () => {
  const [tablesResponse, reservationsResponse] = await Promise.all([
    getAllTables(),
    getReservations(),
  ]);

  const tables = tablesResponse.tables || [];
  const reservations = reservationsResponse.reservations || [];

  const formattedReservations = formatReservationsByTimeSlot(reservations);

  return {
    tables: tables.map((table: Table) => ({
      id: table.id,
      capacity: table.capacity,
      isReserved: table.reservations && table.reservations.length > 0,
      number: table.number,
    })),
    reservations: formattedReservations,
  };
};

export default function ReservationsClientWrapper() {
  const { data, isLoading, error } = useSWR(
    "reservation-data",
    fetchReservationData,
    {
      revalidateOnFocus: true,
      revalidateOnReconnect: true,
      shouldRetryOnError: false,
      keepPreviousData: true,
      onError: (err) => {
        toast.error(err.message);
      },
    }
  );

  if (isLoading && !data) {
    return (
      <div className="flex flex-col items-center justify-center w-full h-[400px] text-gray-500">
        <Spinner size="lg" color="danger" />
      </div>
    );
  }

  return (
    <ReservationsClient
      tables={data?.tables || []}
      reservations={
        data?.reservations || { morning: [], afternoon: [], evening: [] }
      }
    />
  );
}
