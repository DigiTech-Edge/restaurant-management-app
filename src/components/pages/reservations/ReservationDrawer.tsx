import React from "react";
import { Button, Input, Select, SelectItem } from "@nextui-org/react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Drawer } from "@mui/material";

const schema = z.object({
  title: z.string().min(1, "Title is required"),
  firstName: z.string().min(1, "First name is required"),
  surname: z.string().min(1, "Surname is required"),
  phoneNumber: z.string().min(1, "Phone number is required"),
  numberOfPersons: z.number().min(1, "Number of persons is required"),
  reservationDate: z.string().min(1, "Reservation date is required"),
  reservationTime: z.string().min(1, "Reservation time is required"),
  tableNumber: z.number().min(1, "Table number is required"),
});

interface ReservationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: z.infer<typeof schema>) => void;
  selectedTable: any;
  selectedDate: Date;
  selectedTime: string;
}

const ReservationDrawer: React.FC<ReservationDrawerProps> = ({
  isOpen,
  onClose,
  onSave,
  selectedTable,
  selectedDate,
  selectedTime,
}) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: "",
      firstName: "",
      surname: "",
      phoneNumber: "",
      numberOfPersons: selectedTable?.capacity || 1,
      reservationDate: selectedDate.toISOString().split("T")[0],
      reservationTime: selectedTime,
      tableNumber: selectedTable?.number || 1,
    },
  });

  const onSubmit = (data: z.infer<typeof schema>) => {
    onSave(data);
    onClose();
  };

  return (
    <Drawer open={isOpen} onClose={onClose} anchor="right">
      <div className="p-4 bg-gray-900 text-white h-full">
        <h2 className="text-xl font-bold mb-4">Add New Reservation</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <h3 className="font-semibold mb-2">Customer Details</h3>
            <Controller
              name="title"
              control={control}
              render={({ field }) => (
                <Select label="Title" {...field}>
                  <SelectItem key="Mr" value="Mr">
                    Mr
                  </SelectItem>
                  <SelectItem key="Mrs" value="Mrs">
                    Mrs
                  </SelectItem>
                  <SelectItem key="Miss" value="Miss">
                    Miss
                  </SelectItem>
                  <SelectItem key="Ms" value="Ms">
                    Ms
                  </SelectItem>
                </Select>
              )}
            />
            <div className="flex gap-2">
              <Controller
                name="firstName"
                control={control}
                render={({ field }) => <Input label="First Name" {...field} />}
              />
              <Controller
                name="surname"
                control={control}
                render={({ field }) => <Input label="Surname" {...field} />}
              />
            </div>
            <Controller
              name="phoneNumber"
              control={control}
              render={({ field }) => <Input label="Phone Number" {...field} />}
            />
          </div>
          <div>
            <h3 className="font-semibold mb-2">Reservation Details</h3>
            <Controller
              name="numberOfPersons"
              control={control}
              render={({ field }) => (
                <Input
                  type="number"
                  label="Number of Persons"
                  {...field}
                  value={field.value.toString()}
                  onChange={(e) => field.onChange(parseInt(e.target.value))}
                />
              )}
            />
            <Controller
              name="reservationDate"
              control={control}
              render={({ field }) => (
                <Input type="date" label="Reservation Date" {...field} />
              )}
            />
            <Controller
              name="reservationTime"
              control={control}
              render={({ field }) => (
                <Input type="time" label="Reservation Time" {...field} />
              )}
            />
            <Controller
              name="tableNumber"
              control={control}
              render={({ field }) => (
                <Input
                  type="number"
                  label="Table Number"
                  {...field}
                  value={field.value.toString()}
                  onChange={(e) => field.onChange(parseInt(e.target.value))}
                />
              )}
            />
          </div>
          <div className="flex justify-end gap-2">
            <Button color="danger" onClick={onClose}>
              Cancel
            </Button>
            <Button color="primary" type="submit">
              Save
            </Button>
          </div>
        </form>
      </div>
    </Drawer>
  );
};

export default ReservationDrawer;
