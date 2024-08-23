import React from "react";
import { Button } from "@nextui-org/react";

interface TimeSlotsProps {
  selectedTimeSlot: string;
  onTimeSlotChange: (timeSlot: string) => void;
}

const TimeSlots: React.FC<TimeSlotsProps> = ({
  selectedTimeSlot,
  onTimeSlotChange,
}) => {
  const timeSlots = [
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
    "19:00",
    "20:00",
    "21:00",
  ];

  return (
    <div className="flex flex-wrap gap-2">
      {timeSlots.map((slot) => (
        <Button
          key={slot}
          size="sm"
          color={selectedTimeSlot === slot ? "primary" : "default"}
          onClick={() => onTimeSlotChange(slot)}
        >
          {slot}
        </Button>
      ))}
    </div>
  );
};

export default TimeSlots;
