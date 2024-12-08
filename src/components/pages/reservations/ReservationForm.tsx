"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input, Select, SelectItem } from "@nextui-org/react";
import { IoClose } from "react-icons/io5";

const reservationSchema = z.object({
  title: z.string().min(1, "Title is required"),
  firstName: z.string().min(1, "First name is required"),
  surname: z.string().min(1, "Surname is required"),
  phoneNumber: z.string().min(1, "Phone number is required"),
  numberOfPersons: z.string().transform((val) => parseInt(val, 10)),
  reservationDate: z.string().min(1, "Date is required"),
  reservationTime: z.string().min(1, "Time is required"),
  tableNumber: z.string().min(1, "Table number is required"),
});

type ReservationFormData = z.infer<typeof reservationSchema>;

interface ReservationFormProps {
  isOpen?: boolean;
  onClose?: () => void;
  initialData?: Partial<ReservationFormData>;
  onSubmit: (data: ReservationFormData) => void;
  tables: Array<{
    id: string;
    capacity: number;
    number: number;
    isReserved?: boolean;
  }>;
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
}: ReservationFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ReservationFormData>({
    resolver: zodResolver(reservationSchema),
    defaultValues: initialData,
  });

  const isEditing = !!initialData?.tableNumber;

  const onSubmitForm = (data: ReservationFormData) => {
    onSubmit(data);
    reset();
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
          <Button isIconOnly variant="light" onClick={onClose} type="button">
            <IoClose className="w-6 h-6" />
          </Button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          <div className="space-y-4">
            <h3 className="font-medium">Customer Details</h3>
            <Select
              label="Title"
              defaultSelectedKeys={
                initialData?.title ? [initialData.title] : []
              }
              isInvalid={!!errors.title}
              errorMessage={errors.title?.message}
              {...register("title")}
            >
              {titles.map((title) => (
                <SelectItem key={title.value} value={title.value}>
                  {title.label}
                </SelectItem>
              ))}
            </Select>
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="First Name"
                placeholder="Mavis"
                isInvalid={!!errors.firstName}
                errorMessage={errors.firstName?.message}
                {...register("firstName")}
              />
              <Input
                label="Surname"
                placeholder="Amoah"
                isInvalid={!!errors.surname}
                errorMessage={errors.surname?.message}
                {...register("surname")}
              />
            </div>
            <Input
              label="Phone Number"
              placeholder="+1 (123) 23 4564"
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
            <Select
              label="Table Number"
              isInvalid={!!errors.tableNumber}
              errorMessage={errors.tableNumber?.message}
              {...register("tableNumber")}
            >
              {(tables || [])
                .filter(
                  (table) =>
                    !table.isReserved || table.id === initialData?.tableNumber
                )
                .map((table) => (
                  <SelectItem key={table.id} value={table.id}>
                    {`T-${table.number} (${table.capacity} capacity)`}
                  </SelectItem>
                ))}
            </Select>
          </div>
        </div>

        <div className="p-4 border-t flex gap-2">
          <Button
            variant="light"
            type="button"
            onClick={onClose}
            className="flex-1"
          >
            Close
          </Button>
          <Button color="primary" type="submit" className="flex-1 bg-[#5F0101]">
            Save
          </Button>
        </div>
      </form>
    </div>
  );
}
