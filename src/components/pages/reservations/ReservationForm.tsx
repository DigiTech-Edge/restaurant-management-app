"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input, Select, SelectItem } from "@nextui-org/react";
import { IoClose } from "react-icons/io5";
import { useEffect } from "react";
import { toast } from "react-hot-toast";
import { CreateReservationRequest } from "@/types/reservation.types";

type FormData = {
  title: string;
  fullName: string;
  phoneNumber: string;
  numberOfPersons: number;
  reservationDate: string;
  reservationTime: string;
  tableId: string;
};

type ApiData = {
  name: string;
  phone: string;
  numberOfGuests: number;
  tableId: string;
  date: string;
  time: string;
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
  reservationDate: z
    .string()
    .min(1, "Date is required")
    .transform((val) => {
      // Ensure date is in YYYY-MM-DD format
      const date = new Date(val);
      if (isNaN(date.getTime())) {
        throw new Error("Invalid date format");
      }
      return date.toISOString().split("T")[0]; // Returns YYYY-MM-DD
    }),
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
  initialData?: Partial<FormData>;
  onSubmit: (data: CreateReservationRequest) => void;
  tables: Array<{
    id: string;
    capacity: number;
    number: number;
    isReserved?: boolean;
  }>;
  selectedReservation?:
    | {
        tableId: string;
      }
    | undefined;
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
  initialData,
  onSubmit,
  tables,
  selectedReservation,
}: ReservationFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
    reset,
  } = useForm<ReservationFormData>({
    resolver: zodResolver(reservationSchema),
    defaultValues: initialData,
  });

  const isEditing = !!initialData?.tableId;

  useEffect(() => {
    if (!isOpen) {
      // Reset form when closing
      reset();
    }
  }, [isOpen, reset]);

  useEffect(() => {
    if (selectedReservation?.tableId) {
      setValue("tableId", selectedReservation.tableId);
    } else if (initialData?.tableId) {
      setValue("tableId", initialData.tableId);
    }
  }, [selectedReservation, initialData, setValue]);

  const onSubmitForm = async (data: ReservationFormData) => {
    try {
      // Find selected table to check capacity
      const selectedTable = tables.find((t) => t.id === data.tableId);
      if (!selectedTable) {
        throw new Error("Selected table not found");
      }

      if (data.numberOfPersons > selectedTable.capacity) {
        throw new Error(
          `Number of guests cannot exceed table capacity (${selectedTable.capacity})`
        );
      }

      // Transform form data to API format
      const apiData: CreateReservationRequest = {
        name: `${data.title} ${data.fullName}`.trim(),
        phone: data.phoneNumber,
        numberOfGuests: data.numberOfPersons,
        tableId: data.tableId,
        date: data.reservationDate,
        time: data.reservationTime,
      };

      await onSubmit(apiData);
      handleClose();
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to save reservation"
      );
    }
  };

  const handleClose = () => {
    reset(); // Reset form before closing
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
            {isEditing ? "Edit Reservation" : "New Reservation"}
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
            <Select
              label="Title"
              placeholder="Select title"
              isInvalid={!!errors.title}
              errorMessage={errors.title?.message}
              selectedKeys={
                watch("title") ? new Set([watch("title")]) : new Set()
              }
              onSelectionChange={(keys) => {
                const selectedKey = Array.from(keys)[0]?.toString() || "";
                setValue("title", selectedKey);
              }}
            >
              {titles.map((title) => (
                <SelectItem key={title.value} value={title.value}>
                  {title.label}
                </SelectItem>
              ))}
            </Select>

            <Input
              label="Full Name"
              placeholder="Enter full name"
              isInvalid={!!errors.fullName}
              errorMessage={errors.fullName?.message}
              {...register("fullName")}
            />

            <Input
              label="Phone Number"
              placeholder="Enter phone number"
              isInvalid={!!errors.phoneNumber}
              errorMessage={errors.phoneNumber?.message}
              {...register("phoneNumber")}
            />
          </div>

          <div className="space-y-4">
            <h3 className="font-medium">Reservation Details</h3>
            <Input
              label="Number of Persons"
              type="number"
              min="1"
              isInvalid={!!errors.numberOfPersons}
              errorMessage={errors.numberOfPersons?.message}
              {...register("numberOfPersons")}
            />
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Date"
                type="date"
                isInvalid={!!errors.reservationDate}
                errorMessage={errors.reservationDate?.message}
                {...register("reservationDate")}
              />
              <Input
                label="Time"
                type="time"
                isInvalid={!!errors.reservationTime}
                errorMessage={errors.reservationTime?.message}
                {...register("reservationTime")}
              />
            </div>
            <div className="space-y-2">
              <Select
                label="Table"
                placeholder="Select a table"
                isInvalid={!!errors.tableId}
                errorMessage={errors.tableId?.message}
                selectedKeys={
                  watch("tableId") ? new Set([watch("tableId")]) : new Set()
                }
                value={watch("tableId")}
                onSelectionChange={(keys) => {
                  const selectedKey = Array.from(keys)[0]?.toString() || "";
                  setValue("tableId", selectedKey);
                }}
              >
                {tables.map((table) => (
                  <SelectItem
                    key={table.id}
                    value={table.id}
                    textValue={`Table ${table.number} (Capacity: ${table.capacity})`}
                  >
                    Table {table.number} (Capacity: {table.capacity})
                  </SelectItem>
                ))}
              </Select>
            </div>
          </div>
        </div>

        <div className="p-4 border-t flex gap-2">
          <Button
            variant="light"
            type="button"
            onClick={handleClose}
            className="flex-1"
            isDisabled={isSubmitting}
          >
            Close
          </Button>
          <Button
            type="submit"
            color="danger"
            className="flex-1 bg-[#5F0101]"
            isLoading={isSubmitting}
          >
            {isSubmitting ? "Saving..." : "Save"}
          </Button>
        </div>
      </form>
    </div>
  );
}
