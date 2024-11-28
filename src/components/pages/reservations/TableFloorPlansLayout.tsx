"use client";

import React from "react";

const TableFloorPlansLayout = () => {
  const Table = ({ id, reserved }: { id: string; reserved: boolean }) => (
    <div
      className={`border-2 ${
        reserved ? "bg-pink-100 border-pink-300" : "border-gray-300"
      } p-2 text-center flex items-center justify-center`}
    >
      {id}
    </div>
  );

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-12 gap-4 aspect-[4/3]">
        {/* Row 1 */}
        <div className="col-span-4">
          <Table id="T-1" reserved={true} />
        </div>
        <div className="col-span-4">
          <Table id="T-2" reserved={false} />
        </div>
        <div className="col-span-4">
          <Table id="T-3" reserved={true} />
        </div>

        {/* Row 2 */}
        <div className="col-span-3">
          <Table id="T-4" reserved={true} />
        </div>
        <div className="col-span-6">
          <Table id="T-5" reserved={true} />
        </div>
        <div className="col-span-3">
          <Table id="T-6" reserved={false} />
        </div>

        {/* Row 3 */}
        <div className="col-span-3">
          <Table id="T-8" reserved={false} />
        </div>
        <div className="col-span-3">
          <Table id="T-9" reserved={false} />
        </div>
        <div className="col-span-6">
          <Table id="T-7" reserved={false} />
        </div>
      </div>
    </div>
  );
};

export default TableFloorPlansLayout;
