"use client";

import React from "react";
import { Input, Divider } from "@nextui-org/react";
import { FaSearch } from "react-icons/fa";
import { useSearchStore } from "@/store/searchStore";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

interface PageHeaderSearchProps {
  title: string;
}

export default function PageHeaderSearch({ title }: PageHeaderSearchProps) {
  const pathname = usePathname();
  const { searchQuery, setSearchQuery, clearSearch } = useSearchStore();

  // Clear search when navigating away from the page
  useEffect(() => {
    return () => {
      clearSearch();
    };
  }, [pathname, clearSearch]);

  return (
    <>
      <div className="flex items-center justify-between">
        <p className="text-lg font-bold">{title}</p>
        <Input
          placeholder="Search..."
          startContent={<FaSearch className="text-gray-400" />}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="max-w-72 w-full"
          variant="bordered"
          radius="full"
          isClearable
          onClear={() => setSearchQuery("")}
        />
      </div>
      <Divider className="my-4 bg-[#5F0101]" />
    </>
  );
}
