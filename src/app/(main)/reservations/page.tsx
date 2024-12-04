"use client";

import { useState } from "react";
import { FloorPlan } from "@/components/pages/reservations/FloorPlan";
import { ReservationHeader } from "@/components/pages/reservations/ReservationHeader";
import { Legend } from "@/components/pages/reservations/Legend";
import {
  ReservationSidebar,
  type Reservation,
} from "@/components/pages/reservations/ReservationSidebar";
import { ReservationForm } from "@/components/pages/reservations/ReservationForm";
import PageHeader from "@/components/global/PageHeader";

const tables = [
  { id: "T1", seats: 10, position: { x: 20, y: 15 }, isReserved: true },
  { id: "T2", seats: 4, position: { x: 50, y: 15 } },
  { id: "T3", seats: 6, position: { x: 80, y: 15 }, isReserved: true },
  { id: "T4", seats: 4, position: { x: 20, y: 45 } },
  { id: "T5", seats: 6, position: { x: 50, y: 45 }, isReserved: true },
  { id: "T6", seats: 5, position: { x: 20, y: 75 } },
  { id: "T7", seats: 6, position: { x: 80, y: 45 } },
  { id: "T8", seats: 8, position: { x: 50, y: 75 } },
  { id: "T9", seats: 7, position: { x: 80, y: 75 } },
];

const mockReservations = {
  morning: [
    {
      customerName: "Esther Anna Amoh",
      firstName: "Esther",
      surname: "Anna Amoh",
      title: "Miss",
      phoneNumber: "+1 (123) 23 4564",
      time: "8:40am",
      tableId: "T3",
      persons: 4,
    },
    {
      customerName: "Jarvis Anna Amoh",
      firstName: "Jarvis",
      surname: "Anna Amoh",
      title: "Mr",
      phoneNumber: "+1 (123) 23 4564",
      time: "9:40am",
      tableId: "T3",
      persons: 4,
    },
    {
      customerName: "Mercy Anna Amoh",
      firstName: "Mercy",
      surname: "Anna Amoh",
      title: "Mrs",
      phoneNumber: "+1 (123) 23 4564",
      time: "11:25am",
      tableId: "T4",
      persons: 2,
    },
    {
      customerName: "Mavis Anna Amoh",
      firstName: "Mavis",
      surname: "Anna Amoh",
      title: "Miss",
      phoneNumber: "+1 (123) 23 4564",
      time: "10:40am",
      tableId: "T5",
      persons: 6,
    },
  ],
  afternoon: [
    {
      customerName: "Esther Anna Amoh",
      firstName: "Esther",
      surname: "Anna Amoh",
      title: "Miss",
      phoneNumber: "+1 (123) 23 4564",
      time: "8:40am",
      tableId: "T6",
      persons: 7,
    },
    {
      customerName: "Esther Anna Amoh",
      firstName: "Esther",
      surname: "Anna Amoh",
      title: "Miss",
      phoneNumber: "+1 (123) 23 4564",
      time: "8:40am",
      tableId: "T6",
      persons: 7,
    },
    {
      customerName: "Esther Anna Amoh",
      firstName: "Esther",
      surname: "Anna Amoh",
      title: "Miss",
      phoneNumber: "+1 (123) 23 4564",
      time: "8:40am",
      tableId: "T6",
      persons: 7,
    },
    {
      customerName: "Esther Anna Amoh",
      firstName: "Esther",
      surname: "Anna Amoh",
      title: "Miss",
      phoneNumber: "+1 (123) 23 4564",
      time: "8:40am",
      tableId: "T6",
      persons: 7,
    },
  ],
  evening: [
    {
      customerName: "Esther Anna Amoh",
      firstName: "Esther",
      surname: "Anna Amoh",
      title: "Miss",
      phoneNumber: "+1 (123) 23 4564",
      time: "8:40am",
      tableId: "T6",
      persons: 7,
    },
    {
      customerName: "Esther Anna Amoh",
      firstName: "Esther",
      surname: "Anna Amoh",
      title: "Miss",
      phoneNumber: "+1 (123) 23 4564",
      time: "8:40am",
      tableId: "T6",
      persons: 7,
    },
    {
      customerName: "Esther Anna Amoh",
      firstName: "Esther",
      surname: "Anna Amoh",
      title: "Miss",
      phoneNumber: "+1 (123) 23 4564",
      time: "8:40am",
      tableId: "T6",
      persons: 7,
    },
    {
      customerName: "Esther Anna Amoh",
      firstName: "Esther",
      surname: "Anna Amoh",
      title: "Miss",
      phoneNumber: "+1 (123) 23 4564",
      time: "8:40am",
      tableId: "T6",
      persons: 7,
    },
  ],
};

export default function ReservationPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedReservation, setSelectedReservation] =
    useState<Partial<Reservation> | null>(null);

  const handleTableClick = (tableId: string) => {
    const table = tables.find((t) => t.id === tableId);
    if (table?.isReserved) {
      // Find the reservation for this table
      const allReservations = [
        ...mockReservations.morning,
        ...mockReservations.afternoon,
        ...mockReservations.evening,
      ];
      const reservation = allReservations.find((r) => r.tableId === tableId);
      if (reservation) {
        setSelectedReservation(reservation);
        setIsFormOpen(true);
      }
    } else {
      setSelectedReservation({ tableNumber: tableId });
      setIsFormOpen(true);
    }
  };

  const handleAddReservation = () => {
    setSelectedReservation(null);
    setIsFormOpen(true);
  };

  const handleEditReservation = (reservation: Reservation) => {
    setSelectedReservation(reservation);
    setIsFormOpen(true);
  };

  return (
    <div className="h-full flex flex-col">
      <PageHeader title="Reservations" />
      <div className="flex-1 flex relative">
        <div className="flex-1 flex flex-col h-[calc(100vh-8rem)] overflow-auto">
          <ReservationHeader onMenuClick={() => setIsSidebarOpen(true)} />
          <div className="flex-1 p-4">
            <FloorPlan tables={tables} onTableClick={handleTableClick} />
            <Legend />
          </div>
        </div>
        <ReservationSidebar
          date={new Date()}
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          reservations={mockReservations}
          onEditReservation={handleEditReservation}
          onAddReservation={handleAddReservation}
        />
        <ReservationForm
          isOpen={isFormOpen}
          onClose={() => setIsFormOpen(false)}
          initialData={selectedReservation!}
          tables={tables}
          onSubmit={(data) => {
            console.log("Form submitted:", data);
            setIsFormOpen(false);
          }}
        />
      </div>
    </div>
  );
}
