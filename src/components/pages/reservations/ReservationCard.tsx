"use client";

import React from "react";
import { motion } from "framer-motion";

interface Reservation {
  id: string;
  customerName: string;
  tableNumber: string;
  startTime: string;
  endTime: string;
  guests: number;
}

interface ReservationCardProps {
  reservation: Reservation;
}

const ReservationCard: React.FC<ReservationCardProps> = ({ reservation }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="absolute top-0 left-0 right-0 bottom-0 bg-[#5F0101] text-white p-1 text-xs overflow-hidden"
    >
      <div className="font-bold">{reservation.customerName}</div>
      <div>Guests: {reservation.guests}</div>
      <div>
        {reservation.startTime} - {reservation.endTime}
      </div>
    </motion.div>
  );
};

export default ReservationCard;
