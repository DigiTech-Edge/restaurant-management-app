"use client";

import { Suspense } from "react";
import PageHeaderSearch from "@/components/global/PageHeaderSearch";
import { categories } from "@/lib/constants";
import { Product } from "@/types/ProductTypes";
import ProductsTable from "@/components/pages/menu/ProductsTable";
import MenuClientWrapper from "@/components/pages/menu/MenuClientWrapper";
import { useSearchStore } from "@/store/searchStore";

function SearchBarFallback() {
  return <>Loading categories...</>;
}

const sampleProducts: Product[] = [
  {
    id: "1",
    name: "Bruschetta",
    ingredients: "Toasted bread, diced tomatoes, garlic, basil, olive oil",
    category: "Starters",
    price: 80.0,
    availability: "Available",
  },
  {
    id: "2",
    name: "Caesar Salad",
    ingredients: "Romaine lettuce, croutons, parmesan cheese, Caesar dressing",
    category: "Salad & Soup",
    price: 95.0,
    availability: "Available",
  },
  {
    id: "3",
    name: "Margherita Pizza",
    ingredients: "Tomato sauce, mozzarella, fresh basil",
    category: "Mains",
    price: 120.0,
    availability: "Available",
  },
  {
    id: "4",
    name: "Spaghetti Carbonara",
    ingredients: "Spaghetti, eggs, pecorino cheese, guanciale, black pepper",
    category: "Mains",
    price: 110.0,
    availability: "Available",
  },
  {
    id: "5",
    name: "Tiramisu",
    ingredients: "Ladyfingers, coffee, mascarpone cheese, cocoa powder",
    category: "Desserts",
    price: 75.0,
    availability: "Available",
  },
  {
    id: "6",
    name: "Cappuccino",
    ingredients: "Espresso, steamed milk, milk foam",
    category: "Drinks",
    price: 45.0,
    availability: "Available",
  },
];

export default function Menu({
  searchParams,
}: {
  searchParams: { category?: string };
}) {
  const selectedCategory = searchParams.category || "";
  const searchQuery = useSearchStore((state) => state.searchQuery);

  // Filter products based on both category and search query
  const filteredProducts = sampleProducts.filter((product) => {
    const matchesCategory = selectedCategory
      ? product.category.toLowerCase() === selectedCategory.toLowerCase()
      : true;

    const matchesSearch = searchQuery
      ? product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.ingredients.toLowerCase().includes(searchQuery.toLowerCase())
      : true;

    return matchesCategory && matchesSearch;
  });

  return (
    <div>
      <PageHeaderSearch title="Menu" />
      <Suspense fallback={<SearchBarFallback />}>
        <MenuClientWrapper
          selectedCategory={selectedCategory}
          categories={categories}
        />
      </Suspense>
      <ProductsTable products={filteredProducts} />
    </div>
  );
}
