import { formatDate } from "@/helpers/dateConverter";
import { Divider } from "@nextui-org/react";
import React from "react";
import { FaRegCalendarAlt } from "react-icons/fa";

const PageHeader = ({
  title,
  showDate = true,
}: {
  title: string;
  showDate?: boolean;
}) => {
  return (
    <>
      <div className="flex items-center justify-between">
        <p className="text-lg font-bold">{title}</p>
        {showDate && (
          <div className="flex items-center gap-2">
            <p className="text-lg font-semibold max-sm:hidden">
              {formatDate(new Date())}
            </p>
            <FaRegCalendarAlt
              size={24}
              className="cursor-pointer hover:opacity-70"
            />
          </div>
        )}
      </div>
      <Divider className="my-4 bg-[#5F0101]" />
    </>
  );
};

export default PageHeader;
