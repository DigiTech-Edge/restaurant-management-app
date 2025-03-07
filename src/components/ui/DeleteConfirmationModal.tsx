"use client";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";
import { FaExclamationTriangle } from "react-icons/fa";

interface DeleteConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => Promise<void>;
  title?: string;
  message?: string;
  isLoading?: boolean;
}

export default function DeleteConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  title = "Confirm Delete",
  message = "Are you sure you want to delete this item? This action cannot be undone.",
  isLoading = false,
}: DeleteConfirmationModalProps) {
  const handleConfirm = async () => {
    await onConfirm();
  };

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose}
      size="sm"
      hideCloseButton={isLoading}
      isDismissable={!isLoading}
    >
      <ModalContent>
        <ModalHeader className="flex gap-2 items-center text-danger">
          <FaExclamationTriangle />
          {title}
        </ModalHeader>
        <ModalBody>
          <p>{message}</p>
        </ModalBody>
        <ModalFooter>
          <Button 
            variant="light" 
            onPress={onClose}
            isDisabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            color="danger"
            onPress={handleConfirm}
            isLoading={isLoading}
            isDisabled={isLoading}
          >
            Delete
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
