"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

interface CategoryCardProps {
  icon: string;
  name: string;
  quantity?: number;
  color: string;
  delay: number;
}

const CategoryCard: React.FC<CategoryCardProps> = ({
  icon,
  name,
  quantity = 20,
  color,
  delay,
}) => {
  return (
    <motion.div
      className={`flex flex-col justify-between p-2 rounded-lg ${color} w-32 h-24 cursor-pointer hover:opacity-75`}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ scale: 1.05 }}
    >
      <div className="flex justify-end">
        <Image src={icon} alt={name} width={24} height={24} />
      </div>
      <div className="flex flex-col items-start">
        <p className="text-sm font-semibold mt-2 text-white">{name}</p>
        <p className="text-xs text-gray-200">{quantity} items</p>
      </div>
    </motion.div>
  );
};

export default CategoryCard;
