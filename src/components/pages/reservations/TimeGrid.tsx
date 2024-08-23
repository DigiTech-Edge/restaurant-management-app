import React from "react";
import { Button } from "@nextui-org/react";

interface TimeGridProps {
  selectedTime: string;
  onTimeChange: (time: string) => void;
}

const TimeGrid: React.FC<TimeGridProps> = ({ selectedTime, onTimeChange }) => {
  const timeSlots = [
    "10:00",
    "11:00",
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
    "22:00",
  ];

  return (
    <div className="grid grid-cols-5 gap-2">
      {timeSlots.map((time) => (
        <Button
          key={time}
          color={selectedTime === time ? "primary" : "default"}
          onClick={() => onTimeChange(time)}
        >
          {time}
        </Button>
      ))}
    </div>
  );
};

export default TimeGrid;
