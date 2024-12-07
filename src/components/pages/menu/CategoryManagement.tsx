"use client";

import { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
} from "@nextui-org/react";
import { FaPlus } from "react-icons/fa";

interface CategoryManagementProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (name: string) => void;
  editingCategory?: string;
}

export default function CategoryManagement({
  isOpen,
  onClose,
  onSave,
  editingCategory,
}: CategoryManagementProps) {
  const [categoryName, setCategoryName] = useState(editingCategory || "");

  const handleSave = () => {
    if (categoryName.trim()) {
      onSave(categoryName.trim());
      setCategoryName("");
      onClose();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="sm">
      <ModalContent>
        <ModalHeader>
          {editingCategory ? "Edit Category" : "Add Category"}
        </ModalHeader>
        <ModalBody>
          <Input
            label="Category Name"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            autoFocus
          />
        </ModalBody>
        <ModalFooter>
          <Button variant="light" onPress={onClose}>
            Cancel
          </Button>
          <Button
            color="primary"
            className="bg-[#5F0101]"
            onPress={handleSave}
            isDisabled={!categoryName.trim()}
          >
            {editingCategory ? "Save Changes" : "Add Category"}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
