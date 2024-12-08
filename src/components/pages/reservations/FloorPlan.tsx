"use client";

import { IoRestaurantOutline } from "react-icons/io5";
import { Table } from "./Table";
import { cn } from "@/lib/utils";
import { Legend } from "./Legend";

interface TableData {
  id: string;
  capacity: number;
  number: number;
  isReserved?: boolean;
}

interface FloorPlanProps {
  tables: TableData[];
  onTableClick?: (tableId: string) => void;
  className?: string;
}

export function FloorPlan({ tables, onTableClick, className }: FloorPlanProps) {
  if (!tables.length) {
    return (
      <div
        className={cn(
          "flex flex-col items-center justify-center h-full min-h-[400px] text-gray-500",
          className
        )}
      >
        <IoRestaurantOutline className="w-12 h-12 mb-2" />
        <p className="text-lg font-medium">No tables found</p>
      </div>
    );
  }
  return (
    <div className={cn("relative w-full h-full", className)}>
      <div className="flex flex-wrap justify-between gap-8">
        {tables.map((table) => (
          <div key={table.id}>
            <Table
              id={table.id}
              number={table.number}
              capacity={table.capacity}
              isReserved={table.isReserved}
              onClick={() => onTableClick?.(table.id)}
            />
          </div>
        ))}
      </div>
      <Legend />
    </div>
  );
}
