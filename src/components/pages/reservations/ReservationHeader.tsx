"use client";

import { Button } from "@nextui-org/react";
import { HiMenu } from "react-icons/hi";
import { FaPlus } from "react-icons/fa";
import TableManagement from "./TableManagement";
import { useState } from "react";

interface ReservationHeaderProps {
  onMenuClick: () => void;
}

export function ReservationHeader({ onMenuClick }: ReservationHeaderProps) {
  const [isTableManagementOpen, setIsTableManagementOpen] = useState(false);

  return (
    <>
      <div className="flex flex-col-reverse sm:flex-row items-center justify-between p-4 border-b gap-4">
        <div className="flex-1 w-full sm:w-auto overflow-x-auto">
          <div className="flex justify-end">
            <Button
              variant="solid"
              size="md"
              className="bg-[#5F0101] text-white"
              startContent={<FaPlus />}
              onClick={() => setIsTableManagementOpen(true)}
            >
              Manage Tables
            </Button>
          </div>
        </div>
        <Button
          isIconOnly
          variant="light"
          aria-label="Menu"
          className="sm:hidden"
          onClick={onMenuClick}
        >
          <HiMenu className="text-2xl" />
        </Button>
      </div>

      <TableManagement
        isOpen={isTableManagementOpen}
        onClose={() => setIsTableManagementOpen(false)}
      />
    </>
  );
}
