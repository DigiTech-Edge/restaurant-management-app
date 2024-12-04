"use client";

import { Table } from "./Table";
import { cn } from "@/lib/utils";

interface TableData {
  id: string;
  seats: number;
  position: { x: number; y: number };
  isReserved?: boolean;
}

interface FloorPlanProps {
  tables: TableData[];
  onTableClick?: (tableId: string) => void;
  className?: string;
}

export function FloorPlan({ tables, onTableClick, className }: FloorPlanProps) {
  return (
    <div className={cn("relative w-full h-full min-h-[1200px]", className)}>
      <div className="flex flex-wrap justify-between gap-8">
        {tables.map((table) => (
          <div key={table.id}>
            <Table
              id={table.id}
              seats={table.seats}
              isReserved={table.isReserved}
              onClick={() => onTableClick?.(table.id)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
