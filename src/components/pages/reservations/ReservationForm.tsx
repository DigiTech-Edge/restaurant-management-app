"use client";

import { z } from "zod";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input, Select, SelectItem } from "@nextui-org/react";
import { IoClose } from "react-icons/io5";
import { useEffect, useCallback } from "react";
import { toast } from "react-hot-toast";
import { CreateReservationRequest } from "@/types/reservation.types";
import { FormattedReservation } from "./ReservationSidebar";

type FormData = {
  title: string;
  fullName: string;
  phoneNumber: string;
  numberOfPersons: string;
  reservationDate: string;
  reservationTime: string;
  tableId: string;
};

const reservationSchema = z.object({
  title: z.string().min(1, "Title is required"),
  fullName: z.string().min(1, "Full name is required"),
  phoneNumber: z
    .string()
    .min(10, "Phone number must be 10 digits")
    .max(10, "Phone number must be 10 digits")
    .regex(/^\d+$/, "Phone number must only contain digits"),
  numberOfPersons: z
    .string()
    .min(1, "Number of persons is required")
    .transform((val) => {
      const num = parseInt(val, 10);
      if (isNaN(num) || num < 1) {
        throw new Error("Must be at least 1 person");
      }
      return num;
    }),
  reservationDate: z.string().min(1, "Date is required"),
  reservationTime: z
    .string()
    .min(1, "Time is required")
    .regex(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, "Time must be in HH:MM format"),
  tableId: z.string().min(1, "Table is required"),
});

type ReservationFormData = z.infer<typeof reservationSchema>;

interface ReservationFormProps {
  isOpen?: boolean;
  onClose?: () => void;
  onSubmit: (data: CreateReservationRequest) => void;
  tables: Array<{
    id: string;
    capacity: number;
    number: number;
    isReserved?: boolean;
  }>;
  selectedReservation?: FormattedReservation | { tableId: string } | null;
}

const titles = [
  { label: "Mr", value: "Mr" },
  { label: "Mrs", value: "Mrs" },
  { label: "Miss", value: "Miss" },
  { label: "Dr", value: "Dr" },
];

export function ReservationForm({
  isOpen,
  onClose,
  onSubmit,
  tables,
  selectedReservation,
}: ReservationFormProps) {
  const getInitialValues = useCallback(() => {
    const now = new Date();
    const currentTime = `${String(now.getHours()).padStart(2, "0")}:${String(
      now.getMinutes()
    ).padStart(2, "0")}`;

    if (selectedReservation && "id" in selectedReservation) {
      const [title, ...nameParts] = selectedReservation.customerName.split(" ");
      const fullName = nameParts.join(" ");

      // Parse the time from the selected reservation
      const timeMatch = selectedReservation.time.match(/(\d{1,2}):(\d{2})/);
      let formattedTime = currentTime;

      if (timeMatch) {
        const [_, hours, minutes] = timeMatch;
        formattedTime = `${hours.padStart(2, "0")}:${minutes}`;
      }

      return {
        title,
        fullName,
        phoneNumber: selectedReservation.phoneNumber,
        numberOfPersons: selectedReservation.persons.toString(),
        reservationDate: new Date(selectedReservation.date)
          .toISOString()
          .split("T")[0],
        reservationTime: formattedTime,
        tableId: selectedReservation.tableId,
      };
    }

    if (selectedReservation && "tableId" in selectedReservation) {
      return {
        title: "",
        fullName: "",
        phoneNumber: "",
        numberOfPersons: "1",
        reservationDate: now.toISOString().split("T")[0],
        reservationTime: currentTime,
        tableId: selectedReservation.tableId,
      };
    }

    return {
      title: "",
      fullName: "",
      phoneNumber: "",
      numberOfPersons: "1",
      reservationDate: now.toISOString().split("T")[0],
      reservationTime: currentTime,
      tableId: "",
    };
  }, [selectedReservation]);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(reservationSchema),
    defaultValues: getInitialValues(),
  });

  // Single useEffect to handle form state
  useEffect(() => {
    const values = getInitialValues();
    reset(values);
  }, [isOpen, selectedReservation, reset, getInitialValues]);

  const onSubmitForm = async (data: FormData) => {
    try {
      const apiData: CreateReservationRequest = {
        name: `${data.title} ${data.fullName}`.trim(),
        phone: data.phoneNumber,
        numberOfGuests: parseInt(data.numberOfPersons, 10),
        tableId: data.tableId,
        date: data.reservationDate,
        time: data.reservationTime,
      };

      await onSubmit(apiData);
      onClose?.();
    } catch (error) {
      toast.error("Failed to save reservation");
    }
  };

  const handleClose = () => {
    onClose?.();
  };

  return (
    <div
      className={`
        fixed inset-y-0 right-0 w-full sm:w-[400px] bg-white shadow-xl
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "translate-x-full"}
        z-50
      `}
    >
      <form
        onSubmit={handleSubmit(onSubmitForm)}
        className="h-full flex flex-col"
      >
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold">
            {selectedReservation ? "Edit Reservation" : "New Reservation"}
          </h2>
          <button
            type="button"
            onClick={handleClose}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <IoClose className="w-6 h-6" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          <div className="space-y-4">
            <h3 className="font-medium">Customer Information</h3>
            <Controller
              name="title"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  label="Title"
                  isInvalid={!!errors.title}
                  errorMessage={errors.title?.message}
                  selectedKeys={
                    field.value ? new Set([field.value]) : new Set()
                  }
                  onChange={(e) => field.onChange(e.target.value)}
                >
                  {titles.map((title) => (
                    <SelectItem key={title.value} value={title.value}>
                      {title.label}
                    </SelectItem>
                  ))}
                </Select>
              )}
            />
            <Controller
              name="fullName"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  label="Full Name"
                  isInvalid={!!errors.fullName}
                  errorMessage={errors.fullName?.message}
                />
              )}
            />
            <Controller
              name="phoneNumber"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  label="Phone Number"
                  isInvalid={!!errors.phoneNumber}
                  errorMessage={errors.phoneNumber?.message}
                />
              )}
            />
          </div>
          <div className="space-y-4">
            <h3 className="font-medium">Reservation Details</h3>
            <Controller
              name="numberOfPersons"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  type="number"
                  min="1"
                  label="Number of Persons"
                  isInvalid={!!errors.numberOfPersons}
                  errorMessage={errors.numberOfPersons?.message}
                />
              )}
            />
            <div className="grid grid-cols-2 gap-4">
              <Controller
                name="reservationDate"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    type="date"
                    label="Date"
                    isInvalid={!!errors.reservationDate}
                    errorMessage={errors.reservationDate?.message}
                  />
                )}
              />
              <Controller
                name="reservationTime"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    type="time"
                    label="Time"
                    isInvalid={!!errors.reservationTime}
                    errorMessage={errors.reservationTime?.message}
                  />
                )}
              />
            </div>
            <div className="space-y-2">
              <Controller
                name="tableId"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    label="Table"
                    isInvalid={!!errors.tableId}
                    errorMessage={errors.tableId?.message}
                    selectedKeys={
                      field.value ? new Set([field.value]) : new Set()
                    }
                    onChange={(e) => field.onChange(e.target.value)}
                  >
                    {tables.map((table) => (
                      <SelectItem
                        key={table.id}
                        value={table.id}
                        textValue={`Table ${table.number} (${table.capacity} persons)`}
                      >
                        Table {table.number} ({table.capacity} persons)
                      </SelectItem>
                    ))}
                  </Select>
                )}
              />
            </div>
          </div>
        </div>

        <div className="p-4 border-t flex gap-2">
          <Button
            variant="light"
            type="button"
            onClick={handleClose}
            className="flex-1"
          >
            Close
          </Button>
          <Button type="submit" color="danger" className="flex-1 bg-[#5F0101]">
            Save
          </Button>
        </div>
      </form>
    </div>
  );
}
