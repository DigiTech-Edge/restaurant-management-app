"use client";

import React from "react";
import { motion } from "framer-motion";
import { FaEdit } from "react-icons/fa";
import { Button } from "@nextui-org/react";
import { Category } from "@/types/menu.types";

interface CategoryCardProps {
  name: string;
  quantity: number;
  color: string;
  delay?: number;
  showEdit?: boolean;
  onEdit?: (e: React.MouseEvent) => void;
}

const CategoryCard: React.FC<CategoryCardProps> = ({
  name,
  quantity,
  color = "bg-gray-700",
  delay = 0,
  onEdit,
  showEdit = true,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className={`relative group p-4 rounded-lg min-w-[150px] ${color} text-white hover:bg-opacity-90 transition-colors`}
    >
      <div className="flex flex-col items-center gap-2">
        <h3 className="text-lg font-semibold">{name}</h3>
        <p className="text-sm opacity-80">{quantity} items</p>
        {showEdit && onEdit && (
          <Button
            isIconOnly
            size="sm"
            variant="light"
            className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity text-white"
            onClick={(e) => {
              e.preventDefault();
              onEdit(e);
            }}
          >
            <FaEdit />
          </Button>
        )}
      </div>
    </motion.div>
  );
};

export default CategoryCard;
