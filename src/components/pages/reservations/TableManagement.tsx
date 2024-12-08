"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
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
  Select,
  SelectItem,
} from "@nextui-org/react";
import { useSession } from "next-auth/react";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import DeleteConfirmationModal from "@/components/ui/DeleteConfirmationModal";
import {
  createTable,
  updateTable,
  deleteTable,
} from "@/services/reservation.service";
import { QRCodeDocument } from "@/components/pdf/QRCodePDF";
import { pdf } from "@react-pdf/renderer";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { capacityOptions } from "@/lib/constants/index";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFDownloadLink,
  Image,
  Font,
} from "@react-pdf/renderer";
import { QRCodeCanvas } from "qrcode.react";

// Register a nice font for the PDF
Font.register({
  family: "Montserrat",
  src: "https://fonts.gstatic.com/s/montserrat/v25/JTUHjIg1_i6t8kCHKm4532VJOt5-QNFgpCs16Hw5aXp-p7K4KLg.ttf",
});

// PDF styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#fff",
    padding: 40,
  },
  header: {
    marginBottom: 20,
    borderBottom: "1 solid #5F0101",
    paddingBottom: 10,
  },
  restaurantName: {
    fontSize: 24,
    fontFamily: "Montserrat",
    color: "#5F0101",
    marginBottom: 10,
  },
  tableInfo: {
    fontSize: 18,
    fontFamily: "Montserrat",
    color: "#333",
    marginBottom: 5,
  },
  qrContainer: {
    alignItems: "center",
    marginVertical: 30,
  },
  qrCode: {
    width: 200,
    height: 200,
  },
  instructions: {
    marginTop: 20,
    padding: 15,
    backgroundColor: "#f8f8f8",
    borderRadius: 5,
  },
  instructionTitle: {
    fontSize: 14,
    fontFamily: "Montserrat",
    color: "#5F0101",
    marginBottom: 10,
  },
  instructionText: {
    fontSize: 12,
    fontFamily: "Montserrat",
    color: "#666",
    marginBottom: 5,
  },
});

interface TableData {
  id: string;
  number: number;
  capacity: number;
}

interface TableManagementProps {
  isOpen: boolean;
  onClose: () => void;
  tables: TableData[];
}

interface TableFormData {
  number: string;
  capacity: string;
}

export default function TableManagement({
  isOpen,
  onClose,
  tables,
}: TableManagementProps) {
  const router = useRouter();
  const { data: session } = useSession();
  const [selectedTable, setSelectedTable] = useState<TableData | null>(null);
  const [tablesData, setTablesData] = useState<TableData[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [tableToDelete, setTableToDelete] = useState<TableData | null>(null);
  const [formData, setFormData] = useState<TableFormData>({
    number: "",
    capacity: "",
  });

  useEffect(() => {
    setTablesData(tables);
  }, [tables]);

  const generateQRValue = (table: TableData) => {
    if (!session?.user?.id) return "";
    const baseUrl = "https://my-restaurant-347.web.app/menu";
    const params = new URLSearchParams({
      tableNumber: table.number.toString(),
      restaurantId: session.user.id,
    });
    return `${baseUrl}?${params.toString()}`;
  };

  const handleDownloadQR = async () => {
    if (!selectedTable) return;
    setIsLoading(true);

    try {
      // Create a temporary div to render the QR code
      const tempDiv = document.createElement("div");
      const qrCode = (
        <QRCodeCanvas
          value={generateQRValue(selectedTable)}
          size={1000}
          level="H"
          bgColor="#ffffff"
        />
      );

      // Render QR code to temp div
      // @ts-ignore
      const ReactDOM = await import("react-dom/client");
      const root = ReactDOM.createRoot(tempDiv);
      root.render(qrCode);

      // Wait for QR code to render and get canvas data
      await new Promise((resolve) => setTimeout(resolve, 100));
      const canvas = tempDiv.querySelector("canvas");
      if (!canvas) {
        throw new Error("Failed to generate QR code");
      }

      // Convert canvas to data URL
      const qrCodeUrl = canvas.toDataURL("image/png");

      // Generate PDF
      const blob = await pdf(
        <QRCodeDocument
          table={selectedTable}
          qrCodeUrl={qrCodeUrl}
          restaurantName={session?.user?.name || "Our Restaurant"}
        />
      ).toBlob();

      // Download PDF
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `table-${selectedTable.number}-qr.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      toast.success("QR Code PDF generated successfully");
    } catch (error) {
      console.error("Error generating QR Code PDF:", error);
      toast.error("Failed to generate QR Code PDF");
    } finally {
      setIsLoading(false);
    }
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

  const confirmDeleteTable = async () => {
    if (!tableToDelete) return;
    try {
      setIsDeleting(true);
      await deleteTable(tableToDelete.id);
      toast.success("Table deleted successfully");
    } catch (error) {
      toast.error("Failed to delete table");
      console.error("Error deleting table:", error);
    } finally {
      setIsDeleting(false);
      setTableToDelete(null);
    }
  };

  const handleSaveTable = async () => {
    try {
      if (!formData.number || !formData.capacity) {
        toast.error("Please fill in all fields");
        return;
      }

      const tableNumber = parseInt(formData.number);
      const tableCapacity = parseInt(formData.capacity);

      if (isNaN(tableNumber) || tableNumber < 1) {
        toast.error("Please enter a valid table number");
        return;
      }

      if (isNaN(tableCapacity) || tableCapacity < 1) {
        toast.error("Please select a valid capacity");
        return;
      }

      setIsLoading(true);
      const tableData = {
        number: tableNumber,
        capacity: tableCapacity,
      };

      if (selectedTable) {
        await updateTable(selectedTable.id, tableData);
        toast.success("Table updated successfully");
      } else {
        await createTable(tableData);
        toast.success("Table created successfully");
      }

      setIsEditing(false);
      setSelectedTable(null);
      setFormData({
        number: "",
        capacity: "",
      });
    } catch (error) {
      const action = selectedTable ? "updating" : "creating";
      if (error instanceof Error) {
        toast.error(`Error ${action} table: ${error.message}`);
      } else {
        toast.error(`Failed to ${action} table`);
      }
      console.error("Error saving table:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const slideVariants = {
    enter: {
      x: "100%",
      opacity: 0,
    },
    center: {
      x: 0,
      opacity: 1,
    },
    exit: {
      x: "-100%",
      opacity: 0,
    },
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
                    opacity: { duration: 0.2 },
                  }}
                  className="w-full"
                >
                  <div className="flex gap-4">
                    <Input
                      label="Table Number"
                      type="number"
                      value={formData.number}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          number: e.target.value,
                        })
                      }
                      min={1}
                      required
                    />
                    <Select
                      label="Capacity"
                      selectedKeys={
                        formData.capacity ? [formData.capacity] : []
                      }
                      onSelectionChange={(keys) => {
                        const selectedKeys = Array.from(keys);
                        if (selectedKeys.length > 0) {
                          setFormData({
                            ...formData,
                            capacity: selectedKeys[0].toString(),
                          });
                        }
                      }}
                    >
                      {capacityOptions.map((num) => (
                        <SelectItem key={num} value={num}>
                          {num}
                        </SelectItem>
                      ))}
                    </Select>
                  </div>
                  <div className="flex gap-2 justify-end mt-4">
                    <Button variant="light" onClick={() => setIsEditing(false)}>
                      Cancel
                    </Button>
                    <Button
                      color="primary"
                      className="bg-[#5F0101]"
                      onClick={handleSaveTable}
                      isLoading={isLoading}
                    >
                      Save Table
                    </Button>
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
                    opacity: { duration: 0.2 },
                  }}
                  className="w-full"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Tables</h3>
                      <div className="space-y-2">
                        {tablesData.length > 0 ? (
                          tablesData.map((table) => (
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
                                  <p className="font-medium">
                                    Table {table.number}
                                  </p>
                                  <p className="text-sm text-gray-500">
                                    Capacity: {table.capacity}
                                  </p>
                                </div>
                                <div className="flex items-center gap-2">
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
                          <QRCodeCanvas
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
        isLoading={isDeleting}
      />
    </>
  );
}
