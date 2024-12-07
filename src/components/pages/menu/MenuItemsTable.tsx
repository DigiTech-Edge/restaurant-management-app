import { useState } from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  Button,
  Pagination,
  Chip,
} from "@nextui-org/react";
import { FiEdit2, FiTrash2, FiPlus } from "react-icons/fi";
import { FaUtensils } from "react-icons/fa";
import { MenuItem, Category } from "@/types/menu.types";
import { deleteMenuItem } from "@/services/menu.service";
import MenuItemModal from "./MenuItemModal";
import DeleteConfirmationModal from "@/components/ui/DeleteConfirmationModal";
import toast from "react-hot-toast";

const columns = [
  { key: "name", label: "Menu Item Name" },
  { key: "price", label: "Price" },
  { key: "category", label: "Category" },
  { key: "available", label: "Status" },
  { key: "actions", label: "Actions" },
];

interface MenuItemsTableProps {
  menuItems: MenuItem[];
  categories: Category[];
}

export default function MenuItemsTable({
  menuItems,
  categories,
}: MenuItemsTableProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<MenuItem | undefined>();
  const [itemToDelete, setItemToDelete] = useState<MenuItem | undefined>();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;

  const pages = Math.ceil(menuItems.length / rowsPerPage);
  const items = menuItems.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  const handleAddItem = () => {
    setEditingItem(undefined);
    setIsModalOpen(true);
  };

  const handleEditItem = (item: MenuItem) => {
    setEditingItem(item);
    setIsModalOpen(true);
  };

  const handleDeleteClick = (item: MenuItem) => {
    setItemToDelete(item);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!itemToDelete) return;
    setIsLoading(true);
    try {
      await deleteMenuItem(itemToDelete.id);
      toast.success("Menu item deleted successfully");
    } catch (error) {
      toast.error("Failed to delete menu item");
    } finally {
      setIsLoading(false);
      setIsDeleteModalOpen(false);
      setItemToDelete(undefined);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Menu Items</h2>
        <Button
          color="primary"
          radius="sm"
          className="bg-[#5F0101]"
          startContent={<FiPlus />}
          onPress={handleAddItem}
        >
          Add Menu Item
        </Button>
      </div>

      <Table
        aria-label="Menu items table"
        bottomContent={
          pages > 1 ? (
            <div className="flex w-full justify-center">
              <Pagination
                isCompact
                showControls
                showShadow
                color="primary"
                page={page}
                total={pages}
                onChange={setPage}
              />
            </div>
          ) : null
        }
        classNames={{
          wrapper: "min-h-[222px]",
        }}
      >
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.key}>{column.label}</TableColumn>
          )}
        </TableHeader>
        <TableBody
          items={items}
          emptyContent={
            <div className="flex flex-col items-center justify-center py-12 text-gray-500">
              <FaUtensils size={48} className="mb-4 text-gray-400" />
              <p className="text-xl font-semibold">No Menu Items Found</p>
              <p className="text-sm">
                Try adjusting your search or category filter
              </p>
            </div>
          }
        >
          {(item) => (
            <TableRow key={item.id}>
              <TableCell>{item.name}</TableCell>
              <TableCell>GHS {item.price.toFixed(2)}</TableCell>
              <TableCell>
                {categories.find((c) => c.id === item.categoryId)?.name}
              </TableCell>
              <TableCell>
                <Chip
                  color={item.available ? "success" : "danger"}
                  variant="flat"
                  size="sm"
                >
                  {item.available ? "Available" : "Unavailable"}
                </Chip>
              </TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Button
                    isIconOnly
                    variant="light"
                    onPress={() => handleEditItem(item)}
                  >
                    <FiEdit2 />
                  </Button>
                  <Button
                    isIconOnly
                    variant="light"
                    color="danger"
                    onPress={() => handleDeleteClick(item)}
                  >
                    <FiTrash2 />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <MenuItemModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        editingItem={editingItem}
        categories={categories}
        onSuccess={() => {
          setIsModalOpen(false);
          setEditingItem(undefined);
        }}
      />

      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setItemToDelete(undefined);
        }}
        onConfirm={handleDeleteConfirm}
        title="Delete Menu Item"
        message={`Are you sure you want to delete "${itemToDelete?.name}"? This action cannot be undone.`}
        isLoading={isLoading}
      />
    </div>
  );
}
