"use client";

import { Button } from "@nextui-org/react";
import { HiMenu } from "react-icons/hi";

interface ReservationHeaderProps {
  onMenuClick: () => void;
}

export function ReservationHeader({ onMenuClick }: ReservationHeaderProps) {
  return (
    <div className="flex flex-col-reverse sm:flex-row items-center justify-between p-4 border-b gap-4">
      <div className="flex-1 w-full sm:w-auto overflow-x-auto">
        <div className="flex items-center gap-2 min-w-max">
          <Button
            variant="bordered"
            radius="full"
            size="sm"
            className="text-[#5F0101] border-[#5F0101]"
          >
            Main room
          </Button>
          <Button
            variant="bordered"
            radius="full"
            size="sm"
            className="text-[#5F0101] border-[#5F0101]"
          >
            Terrace
          </Button>
          <Button
            variant="bordered"
            radius="full"
            size="sm"
            className="text-[#5F0101] border-[#5F0101]"
          >
            2nd floor
          </Button>
          <Button
            variant="bordered"
            radius="full"
            size="sm"
            className="text-[#5F0101] border-[#5F0101]"
          >
            Hide out
          </Button>
          <Button
            variant="bordered"
            radius="full"
            size="sm"
            className="text-[#5F0101] border-[#5F0101]"
          >
            Long name
          </Button>
        </div>
      </div>
      <div className="flex items-center gap-2 w-full sm:w-auto">
        <Button
          className="block sm:hidden text-[#5F0101]"
          isIconOnly
          variant="light"
          onClick={onMenuClick}
        >
          <HiMenu className="w-6 h-6" />
        </Button>
      </div>
    </div>
  );
}
