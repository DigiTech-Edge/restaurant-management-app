"use client";

import React from "react";
import {
  Button,
  Modal,
  ModalContent,
  ModalBody,
  useDisclosure,
} from "@nextui-org/react";
import { motion } from "framer-motion";
import { FaPrint } from "react-icons/fa";
import OrderCard from "./OrderCard";
import InvoiceModal from "./InvoiceModal";

interface OrderItem {
  name: string;
  quantity: number;
  price: number;
  ingredients: string;
}

interface CompletedCardProps {
  orders: OrderItem[];
  orderTime: string;
  tableNumber: string;
  orderNumber: string;
  paymentMethod: string;
  orderType: string;
  delay: number;
}

const CompletedCard: React.FC<CompletedCardProps> = ({
  orders,
  orderTime,
  tableNumber,
  orderNumber,
  paymentMethod,
  orderType,
  delay,
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
        <div className="overflow-x-auto">
          <div className="inline-flex gap-4 text-sm min-w-full">
            <div className="flex flex-col w-[20%] min-w-[150px]">
              <span className="font-semibold">Order Number</span>
              <span>{orderNumber}</span>
            </div>
            <div className="flex flex-col w-[15%] min-w-[100px]">
              <span className="font-semibold">Order Time</span>
              <span>{orderTime}</span>
            </div>
            <div className="flex flex-col w-[15%] min-w-[100px]">
              <span className="font-semibold">Table Number</span>
              <span>{tableNumber}</span>
            </div>
            <div className="flex flex-col w-[15%] min-w-[120px]">
              <span className="font-semibold">Payment Method</span>
              <span>{paymentMethod}</span>
            </div>
            <div className="flex flex-col w-[15%] min-w-[100px]">
              <span className="font-semibold">Type</span>
              <span>{orderType}</span>
            </div>
            <div className="flex flex-col w-[10%] min-w-[80px]">
              <span className="font-semibold">Status</span>
              <span className="text-green-500">Completed</span>
            </div>
            <div className="flex flex-col gap-2 w-[10%] min-w-[80px]">
              <Button
                onClick={onOpen}
                size="sm"
                color="primary"
                className="w-full"
              >
                View
              </Button>
              <Button
                onClick={() => setIsInvoiceOpen(true)}
                size="sm"
                className="w-full bg-[#5F0101] text-white"
                startContent={<FaPrint />}
              >
                Print
              </Button>
            </div>
          </div>
        </div>
      </motion.div>

      <Modal isOpen={isOpen} onClose={onClose} size="sm">
        <ModalContent>
          <ModalBody>
            <OrderCard
              orders={orders}
              orderTime={orderTime}
              tableNumber={tableNumber}
              orderNumber={orderNumber}
              paymentMethod={paymentMethod}
              orderType={orderType}
              statusButtons={[]}
              backgroundColor="#fff"
              delay={0}
            />
          </ModalBody>
        </ModalContent>
      </Modal>

      <InvoiceModal
        isOpen={isInvoiceOpen}
        onClose={() => setIsInvoiceOpen(false)}
        orders={orders}
        orderTime={orderTime}
        tableNumber={tableNumber}
        orderNumber={orderNumber}
        paymentMethod={paymentMethod}
        orderType={orderType}
        isCompleted={true}
      />
    </>
  );
};

export default CompletedCard;
