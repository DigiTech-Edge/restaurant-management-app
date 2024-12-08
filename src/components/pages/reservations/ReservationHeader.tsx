"use client";

import { Button } from "@nextui-org/react";
import { HiMenu } from "react-icons/hi";
import { FaPlus } from "react-icons/fa";
import TableManagement from "./TableManagement";
import { useState } from "react";

interface TableData {
  id: string;
  number: number;
  capacity: number;
}

interface ReservationHeaderProps {
  onMenuClick: () => void;
  tables: TableData[];
}

export function ReservationHeader({
  onMenuClick,
  tables,
}: ReservationHeaderProps) {
  const [isTableManagementOpen, setIsTableManagementOpen] = useState(false);

  return (
    <>
      <div className="flex flex-col-reverse md:flex-row items-center justify-between p-4 border-b gap-4">
        <div className="flex justify-between w-full">
          <div className="max-md:hidden" />
          <Button
            variant="solid"
            size="md"
            className="bg-[#5F0101] text-white"
            startContent={<FaPlus />}
            onClick={() => setIsTableManagementOpen(true)}
          >
            Manage Tables
          </Button>
          <Button
            isIconOnly
            variant="light"
            aria-label="Menu"
            className="md:hidden"
            onClick={onMenuClick}
          >
            <HiMenu className="text-2xl" />
          </Button>
        </div>
      </div>

      {isTableManagementOpen && (
        <TableManagement
          isOpen={isTableManagementOpen}
          onClose={() => setIsTableManagementOpen(false)}
          tables={tables}
        />
      )}
    </>
  );
}
