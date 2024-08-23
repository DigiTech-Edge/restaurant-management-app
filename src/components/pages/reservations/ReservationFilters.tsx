// src/components/pages/reservations/ReservationFilters.tsx
import React from "react";
import { Input, Select, SelectItem } from "@nextui-org/react";

interface ReservationFiltersProps {
  onFilterChange: (filters: any) => void;
}

const ReservationFilters: React.FC<ReservationFiltersProps> = ({
  onFilterChange,
}) => {
  return (
    <div className="flex flex-wrap gap-4 mb-4">
      <Input
        type="date"
        label="Start Date"
        onChange={(e) => onFilterChange({ startDate: e.target.value })}
      />
      <Input
        type="date"
        label="End Date"
        onChange={(e) => onFilterChange({ endDate: e.target.value })}
      />
      <Select
        label="Status"
        onChange={(e) => onFilterChange({ status: e.target.value })}
      >
        <SelectItem key="all" value="all">
          All
        </SelectItem>
        <SelectItem key="confirmed" value="confirmed">
          Confirmed
        </SelectItem>
        <SelectItem key="pending" value="pending">
          Pending
        </SelectItem>
        <SelectItem key="canceled" value="canceled">
          Canceled
        </SelectItem>
      </Select>
      <Select
        label="Party Size"
        onChange={(e) => onFilterChange({ partySize: e.target.value })}
      >
        <SelectItem key="all" value="all">
          All
        </SelectItem>
        <SelectItem key="1-2" value="1-2">
          1-2
        </SelectItem>
        <SelectItem key="3-4" value="3-4">
          3-4
        </SelectItem>
        <SelectItem key="5+" value="5+">
          5+
        </SelectItem>
      </Select>
    </div>
  );
};

export default ReservationFilters;
