"use client";

import React, { useEffect, useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Pagination,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { FiPlus, FiEdit2, FiTrash2, FiEdit } from "react-icons/fi";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { categories } from "@/lib/constants";
import { Product } from "@/types/ProductTypes";
import { motion } from "framer-motion";

const columns = [
  { key: "name", label: "Product Name" },
  { key: "ingredients", label: "Ingredients" },
  { key: "category", label: "Category" },
  { key: "price", label: "Price(GHS)" },
  { key: "availability", label: "Availability" },
  { key: "actions", label: "Actions" },
];

const schema = z.object({
  name: z.string().min(1, "Product name is required"),
  ingredients: z.string().min(1, "Ingredients are required"),
  category: z.string().min(1, "Category is required"),
  price: z.number().min(1, "Price is required"),
  availability: z.enum(["Available", "Unavailable"]),
});

// Update the ProductFormData interface
interface ProductFormData extends Omit<Product, "id"> {
  id?: string;
}

const ProductsTable = ({ products }: { products: Product[] }) => {
  const [page, setPage] = React.useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<ProductFormData | null>(
    null
  );
  const rowsPerPage = 10;

  const pages = Math.ceil(products.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return products.slice(start, end);
  }, [page, products]);

  const {
    control,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ProductFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      ingredients: "",
      category: "",
      price: 0,
      availability: "Available",
    },
  });

  const ingredients = watch("ingredients");

  const handleIngredientChange = (index: number, value: string) => {
    const ingredientArray = ingredients.split(",").map((i) => i.trim());
    ingredientArray[index] = value;
    setValue("ingredients", ingredientArray.join(", "));
  };

  const addIngredient = () => {
    setValue("ingredients", ingredients ? `${ingredients}, ` : "");
  };

  const removeIngredient = (index: number) => {
    const ingredientArray = ingredients.split(",").map((i) => i.trim());
    ingredientArray.splice(index, 1);
    setValue("ingredients", ingredientArray.join(", "));
  };

  useEffect(() => {
    if (!isModalOpen) {
      reset({
        name: "",
        ingredients: "",
        category: "",
        price: 0,
        availability: "Available",
      });
    }
  }, [isModalOpen]);

  const onSubmit = (data: ProductFormData) => {
    const formattedData = {
      ...data,
      ingredients: data.ingredients
        .split(",")
        .map((i) => i.trim())
        .join(", "),
      price: parseFloat(data.price.toString()),
    };
    console.log(formattedData);
    setIsModalOpen(false);
    reset();
  };

  const openModal = (product: any = null) => {
    if (product) {
      const formattedProduct: ProductFormData = {
        ...product,
        ingredients: product.ingredients,
        price: parseFloat(product.price),
      };
      setEditingProduct(formattedProduct);
      reset(formattedProduct);
    } else {
      setEditingProduct(null);
      reset({
        name: "",
        ingredients: "",
        category: "",
        price: 0,
        availability: "Available",
      });
    }
    setIsModalOpen(true);
  };

  const renderCell = (item: any, columnKey: string) => {
    const cellValue = item[columnKey];

    switch (columnKey) {
      case "availability":
        return (
          <span
            className={
              cellValue === "Available" ? "text-green-500" : "text-red-500"
            }
          >
            {cellValue}
          </span>
        );
      case "actions":
        return (
          <div className="flex items-center gap-2">
            <FiEdit
              className="cursor-pointer hover:opacity-70 text-gray-700"
              onClick={() => openModal(item)}
            />
            <FiTrash2 className="cursor-pointer hover:opacity-70 text-red-500" />
          </div>
        );
      default:
        return cellValue;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex justify-end mb-4">
        <Button
          className="bg-[#5f0101] text-white"
          startContent={<FiPlus size={24} />}
          radius="sm"
          onClick={() => openModal()}
        >
          Add New Product
        </Button>
      </div>
      <Table
        aria-label="Products table"
        isStriped
        bottomContent={
          <div className="flex w-full justify-center">
            {pages > 1 && (
              <Pagination
                isCompact
                showControls
                showShadow
                color="primary"
                page={page}
                total={pages}
                onChange={(page) => setPage(page)}
              />
            )}
          </div>
        }
        classNames={{
          wrapper: "max-h-[450px] text-black",
        }}
      >
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn
              key={column.key}
              align={column.key === "actions" ? "center" : "start"}
            >
              {column.label}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody
          items={items}
          emptyContent={
            <div className="text-2xl flex justify-center items-center h-full">
              No products found
            </div>
          }
        >
          {(item: any) => (
            <TableRow key={item.id}>
              {(columnKey: any) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        size="2xl"
        scrollBehavior="outside"
      >
        <ModalContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <ModalHeader>
              {editingProduct ? "Edit Product" : "Add New Product"}
            </ModalHeader>
            <ModalBody>
              <div className="space-y-4">
                <Controller
                  name="name"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      labelPlacement="outside"
                      radius="sm"
                      label="Product Name"
                      placeholder="Enter product name"
                      errorMessage={errors.name?.message}
                      isInvalid={!!errors.name}
                      classNames={{
                        label: "text-lg !text-[#5f0101] font-bold",
                      }}
                    />
                  )}
                />
                <p className="text-lg font-bold">Ingredients</p>
                {ingredients.split(",").map((ingredient, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Input
                      value={ingredient.trim()}
                      onChange={(e) =>
                        handleIngredientChange(index, e.target.value)
                      }
                      label={`Ingredient ${index + 1}`}
                      placeholder="Enter ingredient"
                      radius="sm"
                    />
                    <Button
                      color="danger"
                      variant="light"
                      isIconOnly
                      onClick={() => removeIngredient(index)}
                      disabled={
                        index === 0 && ingredients.split(",").length === 1
                      }
                    >
                      <FiTrash2 />
                    </Button>
                  </div>
                ))}
                <div className="flex justify-end">
                  <Button
                    onClick={addIngredient}
                    variant="light"
                    color="primary"
                  >
                    Add Ingredient
                  </Button>
                </div>

                <div className="flex flex-col gap-4">
                  <Controller
                    name="category"
                    control={control}
                    render={({ field }) => (
                      <Select
                        {...field}
                        label="Category"
                        labelPlacement="outside"
                        placeholder="Select a category"
                        radius="sm"
                        selectedKeys={field.value ? [field.value] : []}
                        onChange={(e) => field.onChange(e.target.value)}
                        errorMessage={errors.category?.message}
                        isInvalid={!!errors.category}
                        classNames={{
                          label: "text-lg !text-[#5f0101] font-bold",
                        }}
                      >
                        {categories.map((category) => (
                          <SelectItem key={category.name} value={category.name}>
                            {category.name}
                          </SelectItem>
                        ))}
                      </Select>
                    )}
                  />

                  <Controller
                    name="price"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        type="number"
                        label="Price"
                        labelPlacement="outside"
                        placeholder="Enter price"
                        radius="sm"
                        errorMessage={errors.price?.message}
                        value={field.value.toString()} // Convert number to string
                        isInvalid={!!errors.price}
                        onChange={(e) =>
                          field.onChange(parseFloat(e.target.value) || 0)
                        } // Parse string back to number
                        classNames={{
                          label: "text-lg !text-[#5f0101] font-bold",
                        }}
                      />
                    )}
                  />

                  <Controller
                    name="availability"
                    control={control}
                    render={({ field }) => (
                      <Select
                        {...field}
                        label="Availability"
                        labelPlacement="outside"
                        placeholder="Select availability"
                        radius="sm"
                        selectedKeys={field.value ? [field.value] : []}
                        onChange={(e) => field.onChange(e.target.value)}
                        errorMessage={errors.availability?.message}
                        isInvalid={!!errors.availability}
                        classNames={{
                          label: "text-lg !text-[#5f0101] font-bold",
                        }}
                      >
                        <SelectItem key="Available" value="Available">
                          Available
                        </SelectItem>
                        <SelectItem key="Unavailable" value="Unavailable">
                          Unavailable
                        </SelectItem>
                      </Select>
                    )}
                  />
                </div>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button
                color="danger"
                variant="light"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </Button>
              <Button
                color="primary"
                className="bg-[#5f0101] text-white"
                type="submit"
              >
                {editingProduct ? "Update" : "Add"} Product
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </motion.div>
  );
};

export default ProductsTable;
