import { Suspense } from "react";
import PageHeader from "@/components/global/PageHeader";
import ReservationsClientWrapper from "@/components/pages/reservations/ReservationsClientWrapper";
import { Spinner } from "@nextui-org/react";
function ReservationsLoading() {
  return (
    <div className="flex flex-col items-center justify-center w-full h-[400px] text-gray-500">
      <Spinner size="lg" color="danger" />
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
