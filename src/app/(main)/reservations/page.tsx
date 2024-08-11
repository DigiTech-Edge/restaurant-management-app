"use client";

import React, { useState } from "react";
import PageHeader from "@/components/global/PageHeader";
import ReservationGrid from "@/components/pages/reservations/ReservationGrid";
import AddReservationModal from "@/components/pages/reservations/AddReservationModal";

// Dummy data for reservations
const dummyReservations = [
  {
    id: "1",
    customerName: "John Doe",
    tableNumber: "3",
    startTime: "12:00",
    endTime: "14:00",
    guests: 4,
  },
  {
    id: "2",
    customerName: "Jane Smith",
    tableNumber: "7",
    startTime: "13:30",
    endTime: "15:30",
    guests: 2,
  },
  {
    id: "3",
    customerName: "Bob Johnson",
    tableNumber: "5",
    startTime: "18:00",
    endTime: "20:00",
    guests: 6,
  },
];

export default function Reservations() {
  const [reservations, setReservations] = useState(dummyReservations);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddReservation = (newReservation: any) => {
    setReservations([
      ...reservations,
      { ...newReservation, id: Date.now().toString() },
    ]);
    setIsModalOpen(false);
  };

  return (
    <div>
      <PageHeader title="Reservations" />
      <AddReservationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddReservation}
      />
      <ReservationGrid
        reservations={reservations}
        onAddReservation={() => setIsModalOpen(true)}
      />
    </div>
  );
}
