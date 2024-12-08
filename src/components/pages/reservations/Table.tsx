"use client";

import { MdOutlineChairAlt } from "react-icons/md";
import {
  tableConfig as tableConfigurations,
  type SeatPosition,
} from "./tableConfig";
import { cn } from "@/lib/utils";

interface TableProps {
  id: string;
  capacity: number;
  number: number;
  isReserved?: boolean;
  onClick?: () => void;
  className?: string;
}

const Seat = () => (
  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-gray-200 rounded-full" />
);

export function Table({
  id,
  capacity,
  number,
  isReserved,
  onClick,
  className,
}: TableProps) {
  const config = tableConfigurations[capacity] || {
    width: 120,
    height: 80,
    capacity: [],
  };
  const seatSize = 50; // Increased chair size

  return (
    <div
      className={cn("relative cursor-pointer transition-colors", className)}
      style={{
        width: config.width + seatSize * 3, // Increased spacing
        height: config.height + seatSize * 3, // Increased spacing
      }}
      onClick={onClick}
    >
      {/* Render capacity */}
      {config.capacity.map((seat: SeatPosition, index: number) => {
        const xPos = (config.width / 2) * seat.x;
        const yPos = (config.height / 2) * seat.y;

        return (
          <div
            key={index}
            className="absolute"
            style={{
              transform: `translate(${xPos + config.width / 2 + seatSize}px, ${
                yPos + config.height / 2 + seatSize
              }px) rotate(${seat.rotation}deg)`,
              width: seatSize,
              height: seatSize,
            }}
          >
            <MdOutlineChairAlt className="w-full h-full" />
          </div>
        );
      })}

      {/* Render table */}
      <div
        className={cn(
          "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
          "border-2 rounded-md transition-colors",
          isReserved
            ? "bg-[#5F01012B] border-[#5F01012B]"
            : "bg-white border-[#5F010159]"
        )}
        style={{
          width: config.width,
          height: config.height,
        }}
      >
        <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-sm font-medium">
          T-{number}
        </span>
      </div>
    </div>
  );
}
