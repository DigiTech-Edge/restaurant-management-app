"use client";

import { useState } from "react";
import { toast } from "react-hot-toast";
import { FloorPlan } from "./FloorPlan";
import { ReservationHeader } from "./ReservationHeader";
import { ReservationSidebar, type Reservation } from "./ReservationSidebar";
import { ReservationForm } from "./ReservationForm";
import {
  createReservation,
  updateReservation,
} from "@/services/reservation.service";

interface TableData {
  id: string;
  capacity: number;
  number: number;
  isReserved?: boolean;
}

interface ReservationsClientProps {
  tables: TableData[];
  reservations: {
    morning: Reservation[];
    afternoon: Reservation[];
    evening: Reservation[];
  };
}

export default function ReservationsClient({
  tables,
  reservations,
}: ReservationsClientProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedReservation, setSelectedReservation] =
    useState<Partial<Reservation> | null>(null);

  const handleTableClick = (tableId: string) => {
    const table = tables.find((t) => t.id === tableId);
    if (table?.isReserved) {
      const allReservations = [
        ...reservations.morning,
        ...reservations.afternoon,
        ...reservations.evening,
      ];
      const reservation = allReservations.find((r) => r.tableId === tableId);
      if (reservation) {
        setSelectedReservation(reservation);
        setIsFormOpen(true);
      }
    } else {
      setSelectedReservation({ tableId });
      setIsFormOpen(true);
    }
  };

  const handleEditReservation = (reservation: Reservation) => {
    setSelectedReservation(reservation);
    setIsFormOpen(true);
  };

  const handleAddReservation = () => {
    setSelectedReservation(null);
    setIsFormOpen(true);
  };

  const handleSubmitReservation = async (formData: any) => {
    try {
      const reservationData = {
        name: `${formData.firstName} ${formData.surname}`,
        phone: formData.phoneNumber,
        numberOfGuests: formData.numberOfPersons,
        tableId: formData.tableNumber,
        date: formData.reservationDate,
        time: formData.reservationTime,
      };

      if (selectedReservation?.tableId) {
        // Update existing reservation
        await updateReservation(selectedReservation.tableId, {
          status: "confirmed",
        });
        toast.success("Reservation updated successfully");
      } else {
        // Create new reservation
        await createReservation(reservationData);
        toast.success("Reservation created successfully");
      }

      setIsFormOpen(false);
      // Refresh the page to get updated data
      window.location.reload();
    } catch (error) {
      console.error("Error saving reservation:", error);
      toast.error("Failed to save reservation");
    }
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 flex relative">
        <div className="flex-1 flex flex-col h-[calc(100vh-8rem)] overflow-auto">
          <ReservationHeader
            onMenuClick={() => setIsSidebarOpen(true)}
            tables={tables}
          />
          <div className="flex-1 p-4">
            <FloorPlan tables={tables} onTableClick={handleTableClick} />
          </div>
        </div>
        <ReservationSidebar
          date={new Date()}
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          reservations={reservations}
          onEditReservation={handleEditReservation}
          onAddReservation={handleAddReservation}
        />
        <ReservationForm
          isOpen={isFormOpen}
          onClose={() => setIsFormOpen(false)}
          initialData={selectedReservation!}
          tables={tables}
          onSubmit={handleSubmitReservation}
        />
      </div>
    </div>
  );
}
