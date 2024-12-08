"use client";

import { Button, Card } from "@nextui-org/react";
import { BsCalendar3 } from "react-icons/bs";
import { IoCalendarOutline, IoClose } from "react-icons/io5";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

export interface FormattedReservation {
  id: string;
  customerName: string;
  firstName: string;
  surname: string;
  title: string;
  phoneNumber: string;
  time: string;
  date: string;
  tableId: string;
  persons: number;
}

interface ReservationSidebarProps {
  date: Date;
  onDateChange: (date: Date) => void;
  isOpen?: boolean;
  onClose?: () => void;
  reservations: {
    morning: FormattedReservation[];
    afternoon: FormattedReservation[];
    evening: FormattedReservation[];
  };
  onEditReservation: (reservation: FormattedReservation) => void;
  onAddReservation: () => void;
  tables: Array<{
    id: string;
    capacity: number;
    number: number;
    isReserved?: boolean;
  }>;
}

export function ReservationSidebar({
  date,
  onDateChange,
  isOpen,
  onClose,
  reservations,
  onEditReservation,
  onAddReservation,
  tables,
}: ReservationSidebarProps) {
  const renderReservationList = (
    reservations: FormattedReservation[],
    title: string
  ) => {
    if (!reservations.length) return null;

    return (
      <div className="space-y-2">
        <h3 className="font-medium text-sm text-gray-500">{title}</h3>
        <div className="space-y-2">
          {reservations.map((reservation, index) => (
            <button
              key={index}
              onClick={() => onEditReservation(reservation)}
              className="w-full p-3 text-left bg-white rounded-lg border hover:border-[#5F0101] transition-colors"
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-medium">{reservation.customerName}</p>
                  <p className="text-sm text-gray-500">
                    {reservation.persons} persons • Table{" "}
                    {
                      tables.find((table) => table.id === reservation.tableId)
                        ?.number
                    }
                  </p>
                </div>
                <span className="text-sm text-gray-500">
                  {reservation.time}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div
      className={`
        fixed inset-y-0 right-0 w-[85vw] md:w-[400px] bg-white/95 shadow-lg
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "translate-x-full md:translate-x-0"}
        overflow-hidden z-50 md:sticky md:top-0 md:h-[calc(100vh-4rem)]
        border-l border-neutral-200
      `}
    >
      <div className="h-full overflow-y-auto">
        <div className="flex items-center justify-between p-4 border-b bg-white">
          <h2 className="font-semibold">Reservations</h2>
          <Button
            isIconOnly
            variant="light"
            onClick={onClose}
            className="md:hidden"
          >
            <IoClose className="w-6 h-6" />
          </Button>
        </div>

        <div className="p-4 space-y-6">
          <div className="space-y-2">
            <p className="text-sm text-gray-500">
              All reservations need to be attended to on time. Treat customers
              fairly and receive them with warmth.
            </p>
            <div className="flex items-start justify-between">
              <div className="flex items-center justify-between mb-4">
                <input
                  type="date"
                  value={format(date, "yyyy-MM-dd")}
                  onChange={(e) => onDateChange(new Date(e.target.value))}
                  className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5F0101]"
                />
              </div>
              <Button
                size="sm"
                className="bg-[#5F0101] text-white mt-2"
                onClick={onAddReservation}
              >
                Add New Reservation
              </Button>
            </div>
          </div>

          {!reservations ||
          !(
            reservations.morning.length ||
            reservations.afternoon.length ||
            reservations.evening.length
          ) ? (
            <div className={cn("w-full h-full flex flex-col")}>
              <div className="flex flex-col items-center justify-center flex-1 p-4 text-gray-500">
                <IoCalendarOutline className="w-12 h-12 mb-2" />
                <p className="text-lg font-medium">No reservations found</p>
              </div>
            </div>
          ) : (
            <>
              {renderReservationList(reservations.morning, "Morning")}
              {renderReservationList(reservations.afternoon, "Afternoon")}
              {renderReservationList(reservations.evening, "Evening")}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
