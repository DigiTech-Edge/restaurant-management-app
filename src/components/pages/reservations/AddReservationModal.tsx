"use client";

import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const schema = z.object({
  customerName: z.string().min(1, "Customer name is required"),
  tableNumber: z.string().min(1, "Table number is required"),
  startTime: z.string().min(1, "Start time is required"),
  endTime: z.string().min(1, "End time is required"),
  guests: z.number().min(1, "Number of guests is required"),
});

interface AddReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: z.infer<typeof schema>) => void;
}

const AddReservationModal: React.FC<AddReservationModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
  });

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalHeader>Add New Reservation</ModalHeader>
          <ModalBody>
            <Controller
              name="customerName"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  label="Customer Name"
                  placeholder="Enter customer name"
                  errorMessage={errors.customerName?.message}
                />
              )}
            />
            <Controller
              name="tableNumber"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  label="Table Number"
                  placeholder="Select table number"
                  errorMessage={errors.tableNumber?.message}
                >
                  {Array.from({ length: 20 }, (_, i) => (
                    <SelectItem key={i + 1} value={`${i + 1}`}>
                      Table {i + 1}
                    </SelectItem>
                  ))}
                </Select>
              )}
            />
            <Controller
              name="startTime"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  type="time"
                  label="Start Time"
                  errorMessage={errors.startTime?.message}
                />
              )}
            />
            <Controller
              name="endTime"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  type="time"
                  label="End Time"
                  errorMessage={errors.endTime?.message}
                />
              )}
            />
            <Controller
              name="guests"
              control={control}
              render={({ field }) => (
                // @ts-ignore
                <Input
                  {...field}
                  type="number"
                  label="Number of Guests"
                  placeholder="Enter number of guests"
                  errorMessage={errors.guests?.message}
                />
              )}
            />
          </ModalBody>
          <ModalFooter>
            <Button color="danger" variant="light" onPress={onClose}>
              Cancel
            </Button>
            <Button color="primary" type="submit">
              Add Reservation
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default AddReservationModal;
