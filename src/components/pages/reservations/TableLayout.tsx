import React from "react";
import { Card, CardBody, Tooltip } from "@nextui-org/react";

interface Table {
  id: number;
  number: number;
  capacity: number;
}

interface Reservation {
  id: string;
  tableNumber: number;
  date: string;
  time: string;
  customerName: string;
  guests: number;
}

interface TableLayoutProps {
  tables: Table[];
  reservations: Reservation[];
  selectedDate: Date;
  selectedTime: string;
  onTableSelect: (table: Table) => void;
}

const TableLayout: React.FC<TableLayoutProps> = ({
  tables,
  reservations,
  selectedDate,
  selectedTime,
  onTableSelect,
}) => {
  const getTableStatus = (tableNumber: number) => {
    const reservation = reservations.find(
      (r) =>
        r.tableNumber === tableNumber &&
        r.date === selectedDate.toISOString().split("T")[0] &&
        r.time === selectedTime
    );

    return reservation
      ? `Reserved: ${reservation.customerName} (${reservation.guests} guests)`
      : "Available";
  };

  return (
    <Card>
      <CardBody>
        <div className="grid grid-cols-5 gap-4">
          {tables.map((table) => (
            <Tooltip key={table.id} content={getTableStatus(table.number)}>
              <div
                className={`aspect-square flex flex-col items-center justify-center rounded-lg text-white font-bold cursor-pointer ${
                  getTableStatus(table.number).startsWith("Reserved") ? "bg-red-500" : "bg-green-500"
                }`}
                onClick={() => onTableSelect(table)}
              >
                <div>Table {table.number}</div>
                <div>{table.capacity} persons</div>
              </div>
            </Tooltip>
          ))}
        </div>
      </CardBody>
    </Card>
  );
};

export default TableLayout;
