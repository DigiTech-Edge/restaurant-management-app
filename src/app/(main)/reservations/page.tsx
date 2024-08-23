"use client";

import React, { useState } from "react";
import PageHeader from "@/components/global/PageHeader";
import DatePicker from "@/components/pages/reservations/DatePicker";
import TimeGrid from "@/components/pages/reservations/TimeGrid";
import TableLayout from "@/components/pages/reservations/TableLayout";
import ReservationSummary from "@/components/pages/reservations/ReservationSummary";
import ReservationDrawer from "@/components/pages/reservations/ReservationDrawer";

// Dummy data for tables
const dummyTables = [
  { id: 1, number: 1, capacity: 2 },
  { id: 2, number: 2, capacity: 4 },
  { id: 3, number: 3, capacity: 6 },
  { id: 4, number: 4, capacity: 8 },
  { id: 5, number: 5, capacity: 2 },
  { id: 6, number: 6, capacity: 4 },
  { id: 7, number: 7, capacity: 6 },
  { id: 8, number: 8, capacity: 8 },
  { id: 9, number: 9, capacity: 2 },
  { id: 10, number: 10, capacity: 4 },
];

// Dummy data for reservations
const dummyReservations = [
  {
    id: "1",
    customerName: "John Doe",
    tableNumber: 3,
    date: "2024-08-08",
    time: "12:00",
    guests: 4,
  },
  {
    id: "2",
    customerName: "Jane Smith",
    tableNumber: 7,
    date: "2024-08-08",
    time: "13:30",
    guests: 2,
  },
  {
    id: "3",
    customerName: "Bob Johnson",
    tableNumber: 5,
    date: "2024-08-08",
    time: "18:00",
    guests: 6,
  },
];

export default function Reservations() {
  const [selectedDate, setSelectedDate] = useState(new Date("2024-08-08"));
  const [selectedTime, setSelectedTime] = useState("12:00");
  const [reservations, setReservations] = useState(dummyReservations);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedTable, setSelectedTable] = useState(null);

  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
    // In a real app, you would fetch reservations for the selected date here
  };

  const handleTimeChange = (time: string) => {
    setSelectedTime(time);
  };

  const handleTableSelect = (table: any) => {
    setSelectedTable(table);
    console.log(table);
    setIsDrawerOpen(true);
  };

  const handleSaveReservation = (newReservation: any) => {
    setReservations([
      ...reservations,
      { ...newReservation, id: Date.now().toString() },
    ]);
    setIsDrawerOpen(false);
  };

  return (
    <div className="space-y-6">
      <PageHeader title="Reservations" />
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="lg:w-3/4 space-y-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <DatePicker
              selectedDate={selectedDate}
              onDateChange={handleDateChange}
            />
          </div>
          <TimeGrid
            selectedTime={selectedTime}
            onTimeChange={handleTimeChange}
          />
          <TableLayout
            tables={dummyTables}
            reservations={reservations}
            selectedDate={selectedDate}
            selectedTime={selectedTime}
            onTableSelect={handleTableSelect}
          />
        </div>
        <div className="lg:w-1/4">
          <ReservationSummary
            tables={dummyTables}
            reservations={reservations}
            selectedDate={selectedDate}
          />
        </div>
      </div>
      <ReservationDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        onSave={handleSaveReservation}
        selectedTable={selectedTable}
        selectedDate={selectedDate}
        selectedTime={selectedTime}
      />
    </div>
  );
}
