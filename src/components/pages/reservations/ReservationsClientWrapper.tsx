"use client";

import useSWR from "swr";
import ReservationsClient from "./ReservationsClient";
import { Spinner } from "@nextui-org/react";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function ReservationsClientWrapper() {
  const { data, isLoading } = useSWR("/api/reservations", fetcher, {
    refreshInterval: 30000, // Poll every 30 seconds
    revalidateOnFocus: false, // Prevent revalidation on tab focus
    keepPreviousData: true, // Keep showing old data while fetching new data
  });

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
      reservations={data?.reservations || []}
    />
  );
}
