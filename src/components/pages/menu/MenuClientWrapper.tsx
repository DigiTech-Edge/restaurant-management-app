"use client";

import { useState, useMemo } from "react";
import { Button } from "@nextui-org/react";
import { FaPlus, FaBoxOpen } from "react-icons/fa";
import CategoryManagement from "./CategoryManagement";
import CategoryCard from "./CategoryCard";
import { useSearchStore } from "@/store/searchStore";
import MenuItemsTable from "./MenuItemsTable";
import { Category, MenuItem } from "@/types/menu.types";
import { useRouter, useSearchParams } from "next/navigation";
import useSWR from "swr";

interface CategoryWithQuantity extends Category {
  quantity: number;
}

interface MenuClientWrapperProps {
  selectedCategory: string;
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function MenuClientWrapper({
  selectedCategory,
}: MenuClientWrapperProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<string | undefined>();
  const searchQuery = useSearchStore((state) => state.searchQuery);

  const { data, isLoading } = useSWR("/api/menu", fetcher, {
    revalidateOnFocus: false,
    keepPreviousData: true,
  });

  const categories = data?.categories || [];
  const menuItems = data?.menuItems || [];

  const handleCategoryChange = (categoryName: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("category", categoryName);
    router.push(`/menu?${params.toString()}`, { scroll: false });
  };

  // Filter categories based on search query
  const filteredCategories = useMemo(() => {
    return categories.filter((category: CategoryWithQuantity) =>
      category.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [categories, searchQuery]);

  // Filter menu items based on selected category and search query
  const filteredMenuItems = useMemo(() => {
    return menuItems.filter((item: MenuItem) => {
      const matchesCategory = selectedCategory
        ? categories
            .find((cat: CategoryWithQuantity) => cat.id === item.categoryId)
            ?.name.toLowerCase() === selectedCategory.toLowerCase()
        : true;

      const matchesSearch = searchQuery
        ? item.name.toLowerCase().includes(searchQuery.toLowerCase())
        : true;

      return matchesCategory && matchesSearch;
    });
  }, [menuItems, categories, selectedCategory, searchQuery]);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center w-full h-[400px] text-gray-500">
        <p className="text-lg">Loading menu data...</p>
      </div>
    );
  }

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold">Categories</h1>
        <Button
          color="primary"
          className="bg-[#5F0101]"
          startContent={<FaPlus />}
          radius="sm"
          onPress={() => {
            setEditingCategory(undefined);
            setIsModalOpen(true);
          }}
        >
          Add New Category
        </Button>
      </div>

      <div className="flex gap-4 my-8 overflow-x-auto overflow-y-hidden scrollbar-thin scrollbar-thumb-[#5F0101] min-h-[150px]">
        {!searchQuery && (
          <div
            onClick={() => handleCategoryChange("")}
            className="cursor-pointer"
          >
            <CategoryCard
              name="All"
              quantity={menuItems.length}
              color={selectedCategory === "" ? "bg-[#5F0101]" : "bg-gray-700"}
              delay={0}
              showEdit={false}
            />
          </div>
        )}
        {filteredCategories.length > 0 ? (
          filteredCategories.map((category: any, index: number) => (
            <div
              key={category.id}
              onClick={() => handleCategoryChange(category.name)}
              className="cursor-pointer"
            >
              <CategoryCard
                name={category.name}
                quantity={category.quantity}
                color={
                  selectedCategory.toLowerCase() === category.name.toLowerCase()
                    ? "bg-[#5F0101]"
                    : "bg-gray-700"
                }
                delay={0.1 * (index + 1)}
                onEdit={(e) => {
                  e.stopPropagation();
                  setEditingCategory(category.id);
                  setIsModalOpen(true);
                }}
              />
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center w-full text-gray-500">
            <FaBoxOpen size={40} className="mb-4 text-gray-400" />
            <p className="text-lg font-semibold">No Categories Found</p>
            <p className="text-sm">Try adjusting your search term</p>
          </div>
        )}
      </div>

      <MenuItemsTable menuItems={filteredMenuItems} categories={categories} />

      <CategoryManagement
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingCategory(undefined);
        }}
        editingCategoryId={editingCategory}
        initialCategory={
          categories.find((cat: Category) => cat.id === editingCategory)?.name
        }
      />
    </>
  );
}
