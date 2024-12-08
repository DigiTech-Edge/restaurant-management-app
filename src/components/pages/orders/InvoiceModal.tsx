"use client";

import React from "react";
import { Modal, ModalContent, ModalBody } from "@nextui-org/react";
import dynamic from "next/dynamic";

const InvoicePDF = dynamic(() => import("../../pdf/InvoicePDF"), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center min-h-[600px]">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-[#5F0101]"></div>
    </div>
  ),
});

interface OrderItem {
  name: string;
  quantity: number;
  price: number;
  ingredients: string;
}

interface InvoiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  orders: OrderItem[];
  orderTime: string;
  tableNumber: string;
  orderNumber: string;
  paymentMethod: string;
  orderType: string;
  isCompleted?: boolean;
}

const InvoiceModal: React.FC<InvoiceModalProps> = ({
  isOpen,
  onClose,
  orders,
  orderTime,
  tableNumber,
  orderNumber,
  paymentMethod,
  orderType,
  isCompleted,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="2xl" scrollBehavior="inside">
      <ModalContent>
        <ModalBody>
          <InvoicePDF
            orders={orders}
            orderTime={orderTime}
            tableNumber={tableNumber}
            orderNumber={orderNumber}
            paymentMethod={paymentMethod}
            orderType={orderType}
            isCompleted={isCompleted}
          />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default InvoiceModal;
