"use client";

import { useState } from "react";
import { Button } from "@nextui-org/react";
import { FaPlus, FaBoxOpen } from "react-icons/fa";
import CategoryManagement from "./CategoryManagement";
import CategoryCard from "./CategoryCard";
import { updateSearchParams } from "@/services/actions/searchParams.action";
import { useSearchStore } from "@/store/searchStore";

interface MenuClientWrapperProps {
  selectedCategory: string;
  categories: Array<{ name: string; quantity: number }>;
}

export default function MenuClientWrapper({
  selectedCategory,
  categories,
}: MenuClientWrapperProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<string | undefined>();
  const searchQuery = useSearchStore((state) => state.searchQuery);

  console.log(categories);

  const handleSaveCategory = (name: string) => {
    // TODO: Implement category save/update logic
    console.log("Saving category:", name);
  };

  // Filter categories based on search query
  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <div className="flex justify-between items-center">
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
          <form action={updateSearchParams}>
            <input type="hidden" name="category" value="" />
            <input type="hidden" name="_url" value="/menu" />
            <button type="submit" className="w-full">
              <CategoryCard
                name="All"
                quantity={20}
                color={selectedCategory === "" ? "bg-[#5F0101]" : "bg-gray-700"}
                delay={0}
                showEdit={false}
              />
            </button>
          </form>
        )}
        {filteredCategories.length > 0 ? (
          filteredCategories.map((category, index) => (
            <form key={category.name} action={updateSearchParams}>
              <input type="hidden" name="category" value={category.name} />
              <input type="hidden" name="_url" value="/menu" />
              <button type="submit" className="w-full">
                <CategoryCard
                  name={category.name}
                  quantity={category.quantity}
                  color={
                    selectedCategory.toLowerCase() === category.name.toLowerCase()
                      ? "bg-[#5F0101]"
                      : "bg-gray-700"
                  }
                  delay={0.1 * (index + 1)}
                  onEdit={() => {
                    setEditingCategory(category.name);
                    setIsModalOpen(true);
                  }}
                />
              </button>
            </form>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center w-full text-gray-500">
            <FaBoxOpen size={40} className="mb-4 text-gray-400" />
            <p className="text-lg font-semibold">No Categories Found</p>
            <p className="text-sm">Try adjusting your search term</p>
          </div>
        )}
      </div>

      <CategoryManagement
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingCategory(undefined);
        }}
        onSave={handleSaveCategory}
        editingCategory={editingCategory}
      />
    </>
  );
}
