"use client";

import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { FloorPlan } from "./FloorPlan";
import { ReservationHeader } from "./ReservationHeader";
import { ReservationSidebar, type Reservation } from "./ReservationSidebar";
import { ReservationForm } from "./ReservationForm";
import {
  createReservation,
  updateReservation,
} from "@/services/reservation.service";
import { CreateReservationRequest } from "@/types/reservation.types";

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
  const [selectedReservation, setSelectedReservation] = useState<{
    tableId: string;
  } | null>(null);
  const [selectedTable, setSelectedTable] = useState<{ id: string } | null>(
    null
  );

  console.log(reservations);

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

  const handleSubmitReservation = async (
    formData: CreateReservationRequest
  ) => {
    try {
      if (selectedReservation?.tableId) {
        await updateReservation(selectedReservation.tableId, {
          status: "confirmed",
        });
      } else {
        await createReservation(formData);
      }

      setIsFormOpen(false);
      setSelectedReservation(null);
      toast.success("Reservation saved successfully");
    } catch (error) {
      throw error; // Let the form handle the error display
    }
  };

  useEffect(() => {
    if (!isFormOpen) {
      setSelectedReservation(null);
      setSelectedTable(null);
    }
  }, [isFormOpen]);

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
          onClose={() => {
            setIsFormOpen(false);
            setSelectedReservation(null);
          }}
          initialData={
            selectedReservation
              ? { tableId: selectedReservation.tableId }
              : undefined
          }
          selectedReservation={selectedReservation || undefined}
          tables={tables}
          onSubmit={handleSubmitReservation}
        />
      </div>
    </div>
  );
}
