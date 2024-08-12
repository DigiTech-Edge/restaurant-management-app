"use client";

import React from "react";
import { Card, CardBody, CardHeader, Progress } from "@nextui-org/react";

interface ReservationSlot {
  time: string;
  reserved: number;
  available: number;
}

const ReservationOverview: React.FC<{ reservations: ReservationSlot[] }> = ({
  reservations,
}) => {
  return (
    <Card>
      <CardHeader className="font-bold text-large text-[#5F0101]">
        Reservation Overview
      </CardHeader>
      <CardBody>
        <div className="space-y-4">
          {reservations.map((slot, index) => (
            <div key={index}>
              <div className="flex justify-between mb-1">
                <span className="text-[#5F0101]">{slot.time}</span>
                <span className="text-[#5F0101]">
                  {slot.reserved} / {slot.reserved + slot.available} reserved
                </span>
              </div>
              <Progress
                value={(slot.reserved / (slot.reserved + slot.available)) * 100}
                size="sm"
                radius="full"
                classNames={{
                  indicator: "bg-[#5F0101]",
                }}
              />
            </div>
          ))}
        </div>
      </CardBody>
    </Card>
  );
};

export default ReservationOverview;
