import React from "react";
import { Card, CardBody, CardHeader, Button } from "@nextui-org/react";
import { FiEdit2, FiTrash2 } from "react-icons/fi";

interface ReservationListProps {
  reservations: any[];
  onEditReservation: (reservation: any) => void;
  onDeleteReservation: (id: string) => void;
}

const ReservationList: React.FC<ReservationListProps> = ({
  reservations,
  onEditReservation,
  onDeleteReservation,
}) => {
  return (
    <Card>
      <CardHeader className="font-bold text-large text-[#5F0101]">
        Reservations
      </CardHeader>
      <CardBody>
        <div className="space-y-4">
          {reservations.map((reservation) => (
            <div
              key={reservation.id}
              className="flex justify-between items-center"
            >
              <div>
                <p className="font-semibold">{reservation.customerName}</p>
                <p className="text-sm">
                  Date: {reservation.date} | Time: {reservation.startTime} to{" "}
                  {reservation.endTime}
                </p>
                <p className="text-sm">
                  Table {reservation.tableNumber} - {reservation.guests} guests
                </p>
                <p className="text-sm">Contact: {reservation.phoneNumber}</p>
                {reservation.specialRequests && (
                  <p className="text-sm">
                    Notes: {reservation.specialRequests}
                  </p>
                )}
              </div>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  color="primary"
                  onClick={() => onEditReservation(reservation)}
                  isIconOnly
                >
                  <FiEdit2 />
                </Button>
                <Button
                  size="sm"
                  color="danger"
                  onClick={() => onDeleteReservation(reservation.id)}
                  isIconOnly
                >
                  <FiTrash2 />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardBody>
    </Card>
  );
};

export default ReservationList;
