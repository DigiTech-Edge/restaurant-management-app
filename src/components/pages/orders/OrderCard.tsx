"use client";

import { Button } from "@nextui-org/react";
import React, { useState } from "react";
import {
  FaClock,
  FaTable,
  FaHashtag,
  FaCreditCard,
  FaUtensils,
} from "react-icons/fa";
import { motion } from "framer-motion";
import InvoiceModal from "./InvoiceModal";
import { updateOrderStatus } from "@/services/order.service";
import { ORDER_STATUS } from "@/lib/constants";
import toast from "react-hot-toast";

interface OrderItem {
  name: string;
  quantity: number;
  description: string;
  price: number;
}

interface OrderCardProps {
  orders: OrderItem[];
  orderTime: string;
  tableNumber: string;
  orderNumber: string;
  orderId: string;
  paymentMethod: string;
  orderType: string;
  status: string;
  backgroundColor: string;
  delay: number;
}

const OrderCard: React.FC<OrderCardProps> = ({
  orders = [],
  orderTime,
  tableNumber,
  orderNumber,
  orderId,
  paymentMethod,
  orderType,
  status,
  backgroundColor = "#fff",
  delay = 0,
}) => {
  const [isInvoiceOpen, setIsInvoiceOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const total =
    orders?.reduce((sum, item) => sum + item.price * item.quantity, 0) || 0;

  const handleStatusUpdate = async () => {
    setIsProcessing(true);
    try {
      const newStatus =
        status.toLowerCase() === "pending"
          ? ORDER_STATUS.PROCESSING
          : ORDER_STATUS.COMPLETED;

      await updateOrderStatus(orderId, newStatus);

      toast.success("Status updated successfully");
    } catch (error) {
      toast.error("Failed to update status");
      console.error("Failed to update status:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  const statusButtons = [
    {
      name: status.toLowerCase() === "pending" ? "Process" : "Complete",
      color: "#5F0101",
      onClick: handleStatusUpdate,
      isLoading: isProcessing,
    },
    {
      name: "Print",
      color: "#5F0101",
      onClick: () => setIsInvoiceOpen(true),
    },
  ];

  return (
    <>
      <motion.div
        className="w-fit p-4 rounded-lg h-fit"
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
              <span className="text-sm text-gray-600">{item.description}</span>
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
              onPress={button.onClick}
              isLoading={button.isLoading}
            >
              {button.name}
            </Button>
          ))}
        </div>
      </motion.div>

      <InvoiceModal
        isOpen={isInvoiceOpen}
        onClose={() => setIsInvoiceOpen(false)}
        orders={orders}
        orderTime={orderTime}
        tableNumber={tableNumber}
        orderNumber={orderNumber}
        paymentMethod={paymentMethod}
        orderType={orderType}
        isCompleted={false}
      />
    </>
  );
};

export default OrderCard;
