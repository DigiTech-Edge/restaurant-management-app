"use client";

import React from "react";
import { motion } from "framer-motion";
import ReservationCard from "./ReservationCard";

interface Reservation {
  id: string;
  customerName: string;
  tableNumber: string;
  startTime: string;
  endTime: string;
  guests: number;
}

interface ReservationGridProps {
  reservations: Reservation[];
  onAddReservation: () => void;
}

const ReservationGrid: React.FC<ReservationGridProps> = ({
  reservations,
  onAddReservation,
}) => {
  const timeSlots = Array.from({ length: 11 }, (_, i) => `${i + 10}:00`);

  return (
    <>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="mb-8 bg-[#5F0101] text-white px-4 py-2 rounded-md flex justify-end"
        onClick={onAddReservation}
      >
        Add New Reservation
      </motion.button>
      <div className="overflow-x-auto">
        <div className="min-w-[1000px]">
          <div className="flex">
            <div className="w-20 font-bold">Table</div>
            {timeSlots.map((time) => (
              <div key={time} className="w-24 text-center font-bold">
                {time}
              </div>
            ))}
          </div>
          {Array.from({ length: 20 }, (_, tableIndex) => (
            <div key={tableIndex} className="flex">
              <div className="w-20 font-bold">Table {tableIndex + 1}</div>
              {timeSlots.map((time) => (
                <div
                  key={time}
                  className="w-24 h-16 border border-gray-200 relative"
                >
                  {reservations
                    .filter(
                      (res) =>
                        res.tableNumber === `${tableIndex + 1}` &&
                        res.startTime >= time &&
                        res.startTime < time.replace(":00", ":59")
                    )
                    .map((reservation) => (
                      <ReservationCard
                        key={reservation.id}
                        reservation={reservation}
                      />
                    ))}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ReservationGrid;
