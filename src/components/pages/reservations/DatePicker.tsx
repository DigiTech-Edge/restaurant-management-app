import React from "react";
import { DatePicker as NextUIDatePicker } from "@nextui-org/react";

interface DatePickerProps {
  selectedDate: Date;
  onDateChange: (date: Date) => void;
}

const DatePicker: React.FC<DatePickerProps> = ({
  selectedDate,
  onDateChange,
}) => {
  return (
    <NextUIDatePicker
      label="Select Date"
      defaultSelected={selectedDate}
      onChange={onDateChange}
      classNames={{
        base: "w-full",
        label: "text-[#5F0101]",
      }}
    />
  );
};

export default DatePicker;
