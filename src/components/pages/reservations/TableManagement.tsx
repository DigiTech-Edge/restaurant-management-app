"use client";

import { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
  Divider,
} from "@nextui-org/react";
import { QRCodeSVG } from "qrcode.react";
import { useSession } from "next-auth/react";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import DeleteConfirmationModal from "@/components/ui/DeleteConfirmationModal";

interface TableData {
  id: string;
  number: number;
  capacity: number;
  status: "available" | "occupied" | "reserved";
}

interface TableManagementProps {
  isOpen: boolean;
  onClose: () => void;
}

interface TableFormData {
  number: string;
  capacity: string;
}

export default function TableManagement({
  isOpen,
  onClose,
}: TableManagementProps) {
  const { data: session } = useSession();
  const [selectedTable, setSelectedTable] = useState<TableData | null>(null);
  const [tables, setTables] = useState<TableData[]>([
    { id: "1", number: 1, capacity: 4, status: "available" },
    { id: "2", number: 2, capacity: 2, status: "occupied" },
    { id: "3", number: 3, capacity: 6, status: "reserved" },
  ]);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<TableFormData>({
    number: "",
    capacity: "",
  });
  const [tableToDelete, setTableToDelete] = useState<TableData | null>(null);

  const generateQRValue = (table: TableData) => {
    if (!session?.user?.id) return "";
    const baseUrl = "https://my-restaurant-347.web.app/menu";
    const params = new URLSearchParams({
      tableNumber: table.number.toString(),
      restaurantId: session.user.id,
    });
    return `${baseUrl}?${params.toString()}`;
  };

  const handleDownloadQR = () => {
    if (!selectedTable) return;

    const svg = document.getElementById("table-qr");
    if (!svg) return;

    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx?.drawImage(img, 0, 0);
      const pngFile = canvas.toDataURL("image/png");

      const downloadLink = document.createElement("a");
      downloadLink.download = `table-${selectedTable.number}-qr.png`;
      downloadLink.href = pngFile;
      downloadLink.click();
    };

    img.src = "data:image/svg+xml;base64," + btoa(svgData);
  };

  const handleAddTable = () => {
    setIsEditing(true);
    setSelectedTable(null);
    setFormData({
      number: "",
      capacity: "",
    });
  };

  const handleEditTable = (table: TableData) => {
    setIsEditing(true);
    setSelectedTable(table);
    setFormData({
      number: table.number.toString(),
      capacity: table.capacity.toString(),
    });
  };

  const handleDeleteTable = (table: TableData) => {
    setTableToDelete(table);
  };

  const confirmDeleteTable = () => {
    if (!tableToDelete) return;
    setTables(tables.filter((table) => table.id !== tableToDelete.id));
    if (selectedTable?.id === tableToDelete.id) {
      setSelectedTable(null);
    }
    setTableToDelete(null);
  };

  const handleSaveTable = () => {
    const newTable = {
      id: selectedTable?.id || Date.now().toString(),
      number: parseInt(formData.number),
      capacity: parseInt(formData.capacity),
      status: selectedTable?.status || "available",
    };

    if (selectedTable) {
      setTables(
        tables.map((table) =>
          table.id === selectedTable.id ? newTable : table
        )
      );
    } else {
      setTables([...tables, newTable]);
    }

    setIsEditing(false);
    setFormData({
      number: "",
      capacity: "",
    });
  };

  const slideVariants = {
    enter: {
      x: "100%",
      opacity: 0
    },
    center: {
      x: 0,
      opacity: 1
    },
    exit: {
      x: "-100%",
      opacity: 0
    }
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} size="2xl">
        <ModalContent>
          <ModalHeader className="flex justify-between items-center">
            <span>Table Management</span>
            {!isEditing && (
              <Button
                color="primary"
                className="bg-[#5F0101] mr-2"
                startContent={<FaPlus />}
                size="sm"
                onClick={handleAddTable}
              >
                Add Table
              </Button>
            )}
          </ModalHeader>
          <ModalBody className="relative overflow-hidden">
            <AnimatePresence mode="wait" initial={false}>
              {isEditing ? (
                <motion.div
                  key="form"
                  initial="enter"
                  animate="center"
                  exit="exit"
                  variants={slideVariants}
                  transition={{
                    x: { type: "spring", stiffness: 300, damping: 30 },
                    opacity: { duration: 0.2 }
                  }}
                  className="w-full"
                >
                  <div className="space-y-4">
                    <Input
                      label="Table Number"
                      type="number"
                      value={formData.number}
                      onChange={(e) =>
                        setFormData({ ...formData, number: e.target.value })
                      }
                    />
                    <Input
                      label="Capacity"
                      type="number"
                      value={formData.capacity}
                      onChange={(e) =>
                        setFormData({ ...formData, capacity: e.target.value })
                      }
                    />
                    <div className="flex gap-2 justify-end">
                      <Button variant="light" onClick={() => setIsEditing(false)}>
                        Cancel
                      </Button>
                      <Button
                        color="primary"
                        className="bg-[#5F0101]"
                        onClick={handleSaveTable}
                      >
                        Save Table
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="tables"
                  initial="enter"
                  animate="center"
                  exit="exit"
                  variants={slideVariants}
                  transition={{
                    x: { type: "spring", stiffness: 300, damping: 30 },
                    opacity: { duration: 0.2 }
                  }}
                  className="w-full"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Tables</h3>
                      <div className="space-y-2">
                        {tables.length > 0 ? (
                          tables.map((table) => (
                            <div
                              key={table.id}
                              className={`p-4 rounded-lg border cursor-pointer ${
                                selectedTable?.id === table.id
                                  ? "border-[#5F0101] bg-[#5F0101]/10"
                                  : "border-gray-200 hover:border-[#5F0101]"
                              }`}
                              onClick={() => setSelectedTable(table)}
                            >
                              <div className="flex justify-between items-center">
                                <div>
                                  <p className="font-medium">Table {table.number}</p>
                                  <p className="text-sm text-gray-500">
                                    Capacity: {table.capacity}
                                  </p>
                                </div>
                                <div className="flex items-center gap-2">
                                  <span
                                    className={`px-2 py-1 rounded-full text-xs ${
                                      table.status === "available"
                                        ? "bg-green-100 text-green-800"
                                        : table.status === "occupied"
                                        ? "bg-red-100 text-red-800"
                                        : "bg-yellow-100 text-yellow-800"
                                    }`}
                                  >
                                    {table.status}
                                  </span>
                                  <Button
                                    isIconOnly
                                    size="sm"
                                    variant="light"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleEditTable(table);
                                    }}
                                  >
                                    <FaEdit className="text-[#5F0101]" />
                                  </Button>
                                  <Button
                                    isIconOnly
                                    size="sm"
                                    variant="light"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleDeleteTable(table);
                                    }}
                                  >
                                    <FaTrash className="text-red-500" />
                                  </Button>
                                </div>
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="flex flex-col items-center justify-center p-8 text-gray-500 border border-dashed rounded-lg">
                            <p>No tables found</p>
                            <Button
                              color="primary"
                              variant="light"
                              className="mt-2 text-[#5F0101]"
                              startContent={<FaPlus />}
                              onClick={handleAddTable}
                            >
                              Add your first table
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">QR Code</h3>
                      {selectedTable ? (
                        <div className="flex flex-col items-center gap-4">
                          <QRCodeSVG
                            id="table-qr"
                            value={generateQRValue(selectedTable)}
                            size={200}
                            level="H"
                            includeMargin
                          />
                          <p className="text-sm text-gray-500 text-center break-all">
                            {generateQRValue(selectedTable)}
                          </p>
                          <Button
                            color="primary"
                            className="bg-[#5F0101]"
                            onClick={handleDownloadQR}
                          >
                            Download QR Code
                          </Button>
                        </div>
                      ) : (
                        <div className="flex items-center justify-center h-full text-gray-500">
                          Select a table to view its QR code
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </ModalBody>
          <Divider className="my-2" />
          <ModalFooter>
            <Button color="danger" variant="light" onPress={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <DeleteConfirmationModal
        isOpen={!!tableToDelete}
        onClose={() => setTableToDelete(null)}
        onConfirm={confirmDeleteTable}
        title="Delete Table"
        message={`Are you sure you want to delete Table ${tableToDelete?.number}? This action cannot be undone.`}
      />
    </>
  );
}
