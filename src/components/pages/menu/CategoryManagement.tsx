import { useState, useEffect } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
} from "@nextui-org/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  createCategory,
  updateCategory,
  deleteCategory,
} from "@/services/menu.service";
import { FiTrash2 } from "react-icons/fi";
import DeleteConfirmationModal from "@/components/ui/DeleteConfirmationModal";
import toast from "react-hot-toast";

const schema = z.object({
  name: z.string().min(1, "Category name is required"),
});

interface CategoryManagementProps {
  isOpen: boolean;
  onClose: () => void;
  editingCategoryId?: string;
  initialCategory?: string;
}

export default function CategoryManagement({
  isOpen,
  onClose,
  editingCategoryId,
  initialCategory,
}: CategoryManagementProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<{ name: string }>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: initialCategory || "",
    },
  });

  useEffect(() => {
    if (isOpen) {
      reset({ name: initialCategory || "" });
    }
  }, [isOpen, initialCategory, reset]);

  const onSubmit = async (data: { name: string }) => {
    setIsLoading(true);
    try {
      if (editingCategoryId) {
        await updateCategory(editingCategoryId, { name: data.name });
        toast.success("Category updated successfully");
      } else {
        await createCategory({ name: data.name });
        toast.success("Category created successfully");
      }
      handleClose();
    } catch (error: any) {
      const errorMessage = error?.message || "Failed to save category";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!editingCategoryId) return;
    setIsLoading(true);
    try {
      await deleteCategory(editingCategoryId);
      toast.success("Category deleted successfully");
      handleClose();
    } catch (error: any) {
      const errorMessage = error?.message || "Failed to delete category";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
      setIsDeleteModalOpen(false);
    }
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={handleClose}>
        <ModalContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <ModalHeader>
              <div className="flex justify-between items-center w-full">
                <span>
                  {editingCategoryId ? "Edit Category" : "Add New Category"}
                </span>
                {editingCategoryId && (
                  <Button
                    isIconOnly
                    color="danger"
                    variant="light"
                    onPress={() => setIsDeleteModalOpen(true)}
                  >
                    <FiTrash2 />
                  </Button>
                )}
              </div>
            </ModalHeader>
            <ModalBody>
              <Input
                {...register("name")}
                label="Category Name"
                isInvalid={!!errors.name}
                errorMessage={errors.name?.message}
                isDisabled={isLoading}
              />
            </ModalBody>
            <ModalFooter>
              <Button
                variant="light"
                onPress={handleClose}
                isDisabled={isLoading}
              >
                Cancel
              </Button>
              <Button
                color="primary"
                type="submit"
                className="bg-[#5F0101]"
                isLoading={isLoading}
              >
                Save
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>

      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteConfirm}
        title="Delete Category"
        message="Are you sure you want to delete this category? This action cannot be undone."
        isLoading={isLoading}
      />
    </>
  );
}
