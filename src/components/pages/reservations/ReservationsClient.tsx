"use client";

import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { mutate } from "swr";
import { FloorPlan } from "./FloorPlan";
import { ReservationHeader } from "./ReservationHeader";
import {
  ReservationSidebar,
  type FormattedReservation,
} from "./ReservationSidebar";
import { ReservationForm } from "./ReservationForm";
import {
  createReservation,
  updateReservation,
} from "@/services/reservation.service";
import {
  CreateReservationRequest,
  UpdateReservationRequest,
} from "@/types/reservation.types";
import { useReservationStore } from "@/store/useReservationStore";

interface TableData {
  id: string;
  capacity: number;
  number: number;
  isReserved?: boolean;
}

interface ReservationsClientProps {
  tables: TableData[];
  reservations: {
    morning: FormattedReservation[];
    afternoon: FormattedReservation[];
    evening: FormattedReservation[];
  };
}

export default function ReservationsClient({
  tables,
  reservations,
}: ReservationsClientProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const {
    selectedDate,
    selectedReservation,
    setSelectedDate,
    setSelectedReservation,
  } = useReservationStore();

  // Initialize filtered reservations with current date's reservations
  const getFilteredReservations = (date: Date) => ({
    morning: Array.isArray(reservations?.morning)
      ? reservations.morning.filter((res) => {
          if (!res?.date) return false;
          const resDate = new Date(res.date);
          return (
            resDate instanceof Date &&
            !isNaN(resDate.getTime()) &&
            resDate.toDateString() === date.toDateString()
          );
        })
      : [],
    afternoon: Array.isArray(reservations?.afternoon)
      ? reservations.afternoon.filter((res) => {
          if (!res?.date) return false;
          const resDate = new Date(res.date);
          return (
            resDate instanceof Date &&
            !isNaN(resDate.getTime()) &&
            resDate.toDateString() === date.toDateString()
          );
        })
      : [],
    evening: Array.isArray(reservations?.evening)
      ? reservations.evening.filter((res) => {
          if (!res?.date) return false;
          const resDate = new Date(res.date);
          return (
            resDate instanceof Date &&
            !isNaN(resDate.getTime()) &&
            resDate.toDateString() === date.toDateString()
          );
        })
      : [],
  });

  const [filteredReservations, setFilteredReservations] = useState(
    getFilteredReservations(selectedDate)
  );

  // Filter reservations based on selected date
  useEffect(() => {
    setFilteredReservations(getFilteredReservations(selectedDate));
  }, [selectedDate, reservations]);

  // Get all reservations for the selected date
  const allCurrentReservations = [
    ...(Array.isArray(filteredReservations?.morning)
      ? filteredReservations.morning
      : []),
    ...(Array.isArray(filteredReservations?.afternoon)
      ? filteredReservations.afternoon
      : []),
    ...(Array.isArray(filteredReservations?.evening)
      ? filteredReservations.evening
      : []),
  ];

  // Check if a table is reserved for the selected date
  const isTableReserved = (tableId: string) => {
    if (!tableId || !Array.isArray(allCurrentReservations)) return false;
    return allCurrentReservations.some((res) => res?.tableId === tableId);
  };

  // Get reservation for a table on the selected date
  const getTableReservation = (tableId: string) => {
    if (!tableId || !Array.isArray(allCurrentReservations)) return undefined;
    return allCurrentReservations.find((res) => res?.tableId === tableId);
  };

  const handleTableClick = (tableId: string) => {
    const reservation = getTableReservation(tableId);
    if (reservation) {
      setSelectedReservation(reservation);
      setIsFormOpen(true);
    } else {
      setSelectedReservation({ tableId });
      setIsFormOpen(true);
    }
  };

  const handleEditReservation = (reservation: FormattedReservation) => {
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
      if (selectedReservation && "id" in selectedReservation) {
        const updateData: UpdateReservationRequest = {
          name: formData.name,
          phone: formData.phone,
          numberOfGuests: formData.numberOfGuests,
        };
        await updateReservation(selectedReservation.id, updateData);
      } else {
        await createReservation(formData);
      }

      setIsFormOpen(false);
      setSelectedReservation(null);
      mutate("reservation-data");
      toast.success("Reservation saved successfully");
    } catch (error: any) {
      const errorMessage = error?.message || "Failed to save reservation";
      toast.error(errorMessage);
      throw error;
    }
  };

  useEffect(() => {
    if (!isFormOpen) {
      setSelectedReservation(null);
    }
  }, [isFormOpen, setSelectedReservation]);

  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 flex relative">
        <div className="flex-1 flex flex-col h-[calc(100vh-8rem)] overflow-auto">
          <ReservationHeader
            onMenuClick={() => setIsSidebarOpen(true)}
            tables={tables.map((table) => ({
              ...table,
              isReserved: isTableReserved(table.id),
            }))}
          />
          <div className="flex-1 p-4">
            <FloorPlan
              tables={tables.map((table) => ({
                ...table,
                isReserved: isTableReserved(table.id),
              }))}
              onTableClick={handleTableClick}
            />
          </div>
        </div>
        <ReservationSidebar
          date={selectedDate}
          onDateChange={setSelectedDate}
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          reservations={filteredReservations}
          onEditReservation={handleEditReservation}
          onAddReservation={handleAddReservation}
          tables={tables}
        />

        <ReservationForm
          isOpen={isFormOpen}
          onClose={() => setIsFormOpen(false)}
          onSubmit={handleSubmitReservation}
          tables={tables}
          selectedReservation={selectedReservation}
        />
      </div>
    </div>
  );
}
