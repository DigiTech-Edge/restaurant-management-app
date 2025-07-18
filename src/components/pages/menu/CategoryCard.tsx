"use client";

import React from "react";
import { motion } from "framer-motion";
import { FaEdit } from "react-icons/fa";
import { Button } from "@nextui-org/react";
import { categories } from "@/lib/constants/index";

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
  const matchedCategory = categories.find((cat) => cat.name === name);
  const icon = matchedCategory?.icon;

  return (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay }}
        className={`relative group p-4 rounded-lg min-w-[150px] h-[120px] ${color} text-white hover:bg-opacity-90 transition-colors`}
      >
        {icon && (
          <img
            src={`/images/category/${icon}.png`}
            alt={name}
            className="w-6 h-6 absolute top-2 left-2"
          />
        )}
        <div className="flex flex-col h-full justify-start items-center space-y-1 mt-10">
          <h3 className="text-md font-semibold line-clamp-2 text-center">
            {name}
          </h3>
          <p className="text-sm opacity-80">{quantity} items</p>
        </div>
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
      </motion.div>

  );
};


export default CategoryCard;
