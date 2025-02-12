import { useState, useEffect } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Select,
  SelectItem,
  Textarea,
  Switch,
} from "@nextui-org/react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { MenuItem, Category } from "@/types/menu.types";
import { createMenuItem, updateMenuItem } from "@/services/menu.service";
import toast from "react-hot-toast";

const schema = z.object({
  name: z.string().min(1, "Name is required"),
  price: z.string().min(1, "Price is required"),
  description: z.string().min(1, "Description is required"),
  categoryId: z.string().min(1, "Category is required"),
  available: z.boolean(),
});

type FormData = z.infer<typeof schema>;

interface MenuItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  editingItem?: MenuItem;
  categories: Category[];
  onSuccess: () => void;
}

export default function MenuItemModal({
  isOpen,
  onClose,
  editingItem,
  categories,
  onSuccess,
}: MenuItemModalProps) {
  const [isLoading, setIsLoading] = useState(false);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      price: "",
      description: "",
      categoryId: "",
      available: true,
    },
  });

  useEffect(() => {
    if (editingItem) {
      reset({
        name: editingItem.name,
        price: editingItem.price.toString(),
        description: editingItem.description,
        categoryId: editingItem.categoryId,
        available: editingItem.available,
      });
    }
  }, [editingItem, reset]);

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    try {
      if (editingItem) {
        await updateMenuItem(editingItem.id, {
          ...data,
          price: Number(data.price),
        });
        toast.success("Menu item updated successfully");
      } else {
        await createMenuItem({
          ...data,
          price: Number(data.price),
        });
        toast.success("Menu item created successfully");
      }
      onSuccess();
      handleClose();
    } catch (error: any) {
      const errorMessage = error?.message || "Failed to save menu item";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    reset({
      name: "",
      price: "",
      description: "",
      categoryId: "",
      available: true,
    });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <ModalContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalHeader>
            {editingItem ? "Edit Menu Item" : "Add New Menu Item"}
          </ModalHeader>
          <ModalBody>
            <div className="space-y-4">
              <Controller
                name="name"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    label="Name"
                    isInvalid={!!errors.name}
                    errorMessage={errors.name?.message}
                  />
                )}
              />
              <Controller
                name="price"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    label="Price"
                    type="number"
                    startContent="GHS"
                    isInvalid={!!errors.price}
                    errorMessage={errors.price?.message}
                  />
                )}
              />
              <Controller
                name="description"
                control={control}
                render={({ field }) => (
                  <Textarea
                    {...field}
                    label="Description"
                    isInvalid={!!errors.description}
                    errorMessage={errors.description?.message}
                  />
                )}
              />
              <Controller
                name="categoryId"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    label="Category"
                    selectedKeys={field.value ? [field.value] : []}
                    isInvalid={!!errors.categoryId}
                    errorMessage={errors.categoryId?.message}
                  >
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </Select>
                )}
              />
              <Controller
                name="available"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <div className="flex justify-between items-center">
                    <span>Available</span>
                    <Switch
                      isSelected={value}
                      onValueChange={onChange}
                      color="danger"
                    />
                  </div>
                )}
              />
            </div>
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
  );
}
