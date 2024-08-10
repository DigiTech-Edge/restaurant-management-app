"use client";

import { Button } from "@nextui-org/react";
import React from "react";
import {
  FaClock,
  FaTable,
  FaHashtag,
  FaCreditCard,
  FaUtensils,
} from "react-icons/fa";
import { motion } from "framer-motion";

interface OrderItem {
  name: string;
  quantity: number;
  ingredients: string;
  price: number;
}

interface OrderCardProps {
  orders: OrderItem[];
  orderTime: string;
  tableNumber: string;
  orderNumber: string;
  paymentMethod: string;
  orderType: string;
  statusButtons: { name: string; color: string }[];
  backgroundColor: string;
  delay: number;
}

const OrderCard: React.FC<OrderCardProps> = ({
  orders,
  orderTime,
  tableNumber,
  orderNumber,
  paymentMethod,
  orderType,
  statusButtons,
  backgroundColor,
  delay,
}) => {
  const total = orders.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <motion.div
      className="w-[382px] p-4 rounded-lg h-fit"
      style={{ backgroundColor }}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
    >
      {orders.map((item, index) => (
        <div key={index} className="mb-2 flex justify-between items-start">
          <div>
            <span className="font-bold">{item.name}</span> ({item.quantity})
            <br />
            <span className="text-sm text-gray-600">{item.ingredients}</span>
          </div>
          <span className="font-semibold flex-shrink-0">
            Ghc {item.price.toFixed(2)}
          </span>
        </div>
      ))}
      <div className="font-bold flex justify-between items-center mb-2">
        <span>Total</span>
        <span>Ghc {total.toFixed(2)}</span>
      </div>
      <div className="border-t border-gray-500 my-4"></div>
      <div className="grid grid-cols-3 gap-4 text-sm mt-4">
        <div className="flex flex-col items-center">
          <div className="bg-gray-200 p-2 rounded-full mb-1">
            <FaClock className="text-gray-600 text-xl" />
          </div>
          <span className="font-semibold">{orderTime}</span>
        </div>
        <div className="flex flex-col items-center">
          <div className="bg-gray-200 p-2 rounded-full mb-1">
            <FaTable className="text-gray-600 text-xl" />
          </div>
          <span className="font-semibold">{tableNumber}</span>
        </div>
        <div className="flex flex-col items-center">
          <div className="bg-gray-200 p-2 rounded-full mb-1">
            <FaHashtag className="text-gray-600 text-xl" />
          </div>
          <span className="font-semibold">{orderNumber}</span>
        </div>
        <div className="flex flex-col items-center">
          <div className="bg-gray-200 p-2 rounded-full mb-1">
            <FaCreditCard className="text-gray-600 text-xl" />
          </div>
          <span className="font-semibold">{paymentMethod}</span>
        </div>
        <div className="flex flex-col items-center col-span-2">
          <div className="bg-gray-200 p-2 rounded-full mb-1">
            <FaUtensils className="text-gray-600 text-xl" />
          </div>
          <span className="font-semibold">{orderType}</span>
        </div>
      </div>
      <div className="mt-4 flex justify-evenly">
        {statusButtons.map((button, index) => (
          <Button
            key={index}
            radius="sm"
            className="w-[150px] text-white"
            style={{ backgroundColor: button.color }}
          >
            {button.name}
          </Button>
        ))}
      </div>
    </motion.div>
  );
};

export default OrderCard;
