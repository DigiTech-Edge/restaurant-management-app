"use client";

import { Card } from "@nextui-org/react";

export function Legend() {
  return (
    <div className="flex items-center justify-center gap-4 p-4 mt-4">
      <div className="flex items-center gap-2">
        <div className="w-4 h-4 bg-[#5F01012B] border border-[#5F01012B] rounded-md" />
        <span className="text-sm text-gray-600">Reserved</span>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-4 h-4 bg-white border border-[#5F010159] rounded-md" />
        <span className="text-sm text-gray-600">Not Reserved</span>
      </div>
    </div>
  );
}
