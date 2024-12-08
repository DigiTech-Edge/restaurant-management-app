"use client";

import React from "react";
import {
  Button,
  Modal,
  ModalContent,
  ModalBody,
  useDisclosure,
  Chip,
} from "@nextui-org/react";
import { motion } from "framer-motion";
import { FaPrint } from "react-icons/fa";
import OrderCard from "./OrderCard";
import InvoiceModal from "./InvoiceModal";

interface OrderItem {
  name: string;
  quantity: number;
  price: number;
  description: string;
}

interface CompletedCardProps {
  orders: OrderItem[];
  orderTime: string;
  tableNumber: string;
  orderNumber: string;
  paymentMethod: string;
  orderType: string;
  delay: number;
  isPaid: boolean;
}

const CompletedCard: React.FC<CompletedCardProps> = ({
  orders,
  orderTime,
  tableNumber,
  orderNumber,
  paymentMethod,
  orderType,
  delay,
  isPaid,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isInvoiceOpen, setIsInvoiceOpen] = React.useState(false);

  return (
    <>
      <motion.div
        className="w-full p-4 rounded-lg bg-gray-100 flex flex-col"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay }}
      >
        <div className="flex justify-between items-center mb-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <FaPrint className="text-[#5F0101]" />
              <span className="font-semibold">Order #{orderNumber}</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm">Time: {orderTime}</span>
              <span className="text-sm">Table: {tableNumber}</span>
              <span className="text-sm">{orderType}</span>
            </div>
          </div>
          <Chip
            className="capitalize"
            color={isPaid ? "success" : "danger"}
            size="sm"
            variant="flat"
          >
            {isPaid ? "Paid" : "Not Paid"}
          </Chip>
        </div>
        <div className="space-y-2">
          {orders.map((item, index) => (
            <div
              key={index}
              className="flex justify-between items-start border-b border-gray-200 pb-2"
            >
              <div>
                <span className="font-bold">{item.name}</span> ({item.quantity})
                <br />
                <span className="text-sm text-gray-600">
                  {item.description}
                </span>
              </div>
              <span className="font-semibold flex-shrink-0">
                Ghc {item.price.toFixed(2)}
              </span>
            </div>
          ))}
        </div>
        <div className="flex justify-between items-center mt-4">
          <div className="text-sm">
            <span className="font-semibold">Payment Method:</span>{" "}
            {paymentMethod}
          </div>
          <Button
            size="sm"
            radius="sm"
            className="w-[150px] text-white"
            style={{ backgroundColor: "#5F0101" }}
            onPress={() => setIsInvoiceOpen(true)}
          >
            Print
          </Button>
        </div>
      </motion.div>
      <InvoiceModal
        isOpen={isInvoiceOpen}
        onClose={() => setIsInvoiceOpen(false)}
        orders={orders}
        orderNumber={orderNumber}
        orderTime={orderTime}
        tableNumber={tableNumber}
        paymentMethod={paymentMethod}
        orderType={orderType}
        isCompleted={true}
      />
    </>
  );
};

export default CompletedCard;
