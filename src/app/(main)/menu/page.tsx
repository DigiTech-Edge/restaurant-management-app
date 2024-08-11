import { Suspense } from "react";
import PageHeaderSearch from "@/components/global/PageHeaderSearch";
import CategoryCard from "@/components/pages/menu/CategoryCard";
import { categories } from "@/lib/constants";
import { getCategoryIcon } from "@/helpers/categoryIcon";
import { updateSearchParams } from "@/utils/actions/searchParams.action";
import ProductsTable from "@/components/pages/menu/ProductsTable";

function SearchBarFallback() {
  return <>Loading categories...</>;
}

const sampleProducts = [
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

  // Filter products based on the selected category
  const filteredProducts = selectedCategory
    ? sampleProducts.filter(
        (product) =>
          product.category.toLowerCase() === selectedCategory.toLowerCase()
      )
    : sampleProducts;

  return (
    <div>
      <PageHeaderSearch title="Menu" />
      <h1 className="text-xl font-bold">Categories</h1>
      <Suspense fallback={<SearchBarFallback />}>
        <div className="flex flex-wrap justify-center gap-4 my-8">
          <form action={updateSearchParams}>
            <input type="hidden" name="category" value="" />
            <input type="hidden" name="_url" value="/menu" />
            <button type="submit" className="w-full">
              <CategoryCard
                icon={getCategoryIcon("All")}
                name="All"
                quantity={20}
                color={selectedCategory === "" ? "bg-[#5F0101]" : "bg-gray-700"}
              />
            </button>
          </form>
          {categories.map((category) => (
            <form key={category.name} action={updateSearchParams}>
              <input type="hidden" name="category" value={category.name} />
              <input type="hidden" name="_url" value="/menu" />
              <button type="submit" className="w-full">
                <CategoryCard
                  icon={getCategoryIcon(category.name)}
                  name={category.name}
                  quantity={20}
                  color={
                    selectedCategory.toLowerCase() ===
                    category.name.toLowerCase()
                      ? "bg-[#5F0101]"
                      : "bg-gray-700"
                  }
                />
              </button>
            </form>
          ))}
        </div>
      </Suspense>
      <ProductsTable products={filteredProducts} />
    </div>
  );
}
