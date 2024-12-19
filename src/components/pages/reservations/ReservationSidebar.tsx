"use client";

import {
  Button,
  Card,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";
import { BsCalendar3 } from "react-icons/bs";
import { IoCalendarOutline, IoClose } from "react-icons/io5";
import { MdCancel } from "react-icons/md";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { cancelReservation } from "@/services/reservation.service";

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
  const {
    isOpen: isModalOpen,
    onOpen: onModalOpen,
    onClose: onModalClose,
  } = useDisclosure();
  const [selectedReservationId, setSelectedReservationId] = useState<
    string | null
  >(null);
  const [isCancelling, setIsCancelling] = useState(false);

  const handleCancelClick = (e: React.MouseEvent, reservationId: string) => {
    e.stopPropagation();
    setSelectedReservationId(reservationId);
    onModalOpen();
  };

  const handleConfirmCancel = async () => {
    if (!selectedReservationId) return;

    setIsCancelling(true);
    try {
      await cancelReservation(selectedReservationId);
      toast.success("Reservation cancelled successfully");
      onModalClose();
    } catch (error) {
      toast.error("Failed to cancel reservation");
      console.error("Error cancelling reservation:", error);
    } finally {
      setIsCancelling(false);
      setSelectedReservationId(null);
    }
  };

  const renderReservationList = (
    reservations: FormattedReservation[],
    title: string
  ) => {
    if (!reservations.length) return null;

    const isFutureReservation = (reservation: FormattedReservation) => {
      const reservationDateTime = new Date(reservation.date);
      const now = new Date();
      return reservationDateTime > now;
    };

    return (
      <div className="space-y-2">
        <h3 className="font-medium text-sm text-gray-500">{title}</h3>
        <div className="space-y-2">
          {reservations.map((reservation, index) => (
            <div
              key={index}
              onClick={() => onEditReservation(reservation)}
              className="w-full p-3 text-left bg-white rounded-lg border hover:border-[#5F0101] transition-colors cursor-pointer"
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
                <div className="flex flex-col items-end gap-2">
                  <span className="text-sm text-gray-500">
                    {reservation.time}
                  </span>
                  {isFutureReservation(reservation) && (
                    <Button
                      size="sm"
                      color="danger"
                      variant="flat"
                      startContent={<MdCancel />}
                      onClick={(e) => handleCancelClick(e, reservation.id)}
                      className="min-w-0 h-auto py-1"
                    >
                      Cancel
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <>
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

      <Modal isOpen={isModalOpen} onClose={onModalClose}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Cancel Reservation
              </ModalHeader>
              <ModalBody>
                <p>Are you sure you want to cancel this reservation?</p>
                <p className="text-sm text-gray-500">
                  This action cannot be undone.
                </p>
              </ModalBody>
              <ModalFooter>
                <Button
                  variant="light"
                  onPress={onClose}
                  disabled={isCancelling}
                >
                  Close
                </Button>
                <Button
                  color="danger"
                  onPress={handleConfirmCancel}
                  isLoading={isCancelling}
                >
                  Cancel Reservation
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
