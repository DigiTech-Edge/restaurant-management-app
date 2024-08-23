import React from "react";
import { Card, CardBody, CardHeader, Progress } from "@nextui-org/react";

interface ReservationSummaryProps {
  tables: any[];
  reservations: any[];
  selectedDate: Date;
}

const ReservationSummary: React.FC<ReservationSummaryProps> = ({
  tables,
  reservations,
  selectedDate,
}) => {
  const totalTables = tables.length;
  const totalCapacity = tables.reduce((sum, table) => sum + table.capacity, 0);
  const reservedTables = reservations.filter(
    (r) => r.date === selectedDate.toISOString().split("T")[0]
  ).length;
  const reservedSeats = reservations
    .filter((r) => r.date === selectedDate.toISOString().split("T")[0])
    .reduce((sum, r) => sum + r.guests, 0);

  const availableTables = totalTables - reservedTables;
  const availableSeats = totalCapacity - reservedSeats;

  return (
    <Card>
      <CardHeader className="font-bold text-large text-[#5F0101]">
        Reservation Summary
      </CardHeader>
      <CardBody>
        <div className="space-y-4">
          <div>
            <p>
              Tables: {reservedTables} / {totalTables} reserved
            </p>
            <Progress
              value={(reservedTables / totalTables) * 100}
              color="primary"
            />
          </div>
          <div>
            <p>
              Seats: {reservedSeats} / {totalCapacity} reserved
            </p>
            <Progress
              value={(reservedSeats / totalCapacity) * 100}
              color="primary"
            />
          </div>
          <p>Available Tables: {availableTables}</p>
          <p>Available Seats: {availableSeats}</p>
        </div>
      </CardBody>
    </Card>
  );
};

export default ReservationSummary;
