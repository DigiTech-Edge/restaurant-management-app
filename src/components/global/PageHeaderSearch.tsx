import { formatDate } from "@/helpers/dateConverter";
import { Divider, Input } from "@nextui-org/react";
import React from "react";
import { FaRegCalendarAlt, FaSearch } from "react-icons/fa";

const PageHeaderSearch = ({ title }: { title: string }) => {
  return (
    <>
      <div className="flex items-center justify-between">
        <p className="text-lg font-bold">{title}</p>
        <Input
          radius="full"
          placeholder="Search..."
          // color="primary"
          endContent={<FaSearch />}
          className="max-w-72 w-full "
          variant="bordered"
        />
      </div>
      <Divider className="my-4 bg-[#5F0101]" />
    </>
  );
};

export default PageHeaderSearch;
