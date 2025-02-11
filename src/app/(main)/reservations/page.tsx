import { Suspense } from "react";
import PageHeader from "@/components/global/PageHeader";
import ReservationsClientWrapper from "@/components/pages/reservations/ReservationsClientWrapper";

function ReservationsLoading() {
  return (
    <div className="flex flex-col items-center justify-center w-full h-[400px] text-gray-500">
      <p className="text-lg">Loading reservations...</p>
    </div>
  );
}

export default function ReservationsPage() {
  return (
    <div>
      <PageHeader title="Reservations" />
      <Suspense fallback={<ReservationsLoading />}>
        <ReservationsClientWrapper />
      </Suspense>
    </div>
  );
}
