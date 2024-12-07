import { Suspense } from "react";
import PageHeaderSearch from "@/components/global/PageHeaderSearch";
import { getAllCategories, getAllMenuItems } from "@/services/menu.service";
import MenuClientWrapper from "@/components/pages/menu/MenuClientWrapper";
import { MenuItem } from "@/types/menu.types";

function SearchBarFallback() {
  return <>Loading categories...</>;
}

export default async function Menu({
  searchParams,
}: {
  searchParams: { category?: string };
}) {
  const [categories, menuItems] = await Promise.all([
    getAllCategories(),
    getAllMenuItems(),
  ]);

  // Transform categories to include quantity
  const categoriesWithQuantity = categories.map((category) => ({
    ...category,
    quantity: menuItems.filter(
      (item: MenuItem) => item.categoryId === category.id
    ).length,
  }));

  return (
    <div className="p-6">
      <Suspense fallback={<SearchBarFallback />}>
        <PageHeaderSearch title="Menu" />
      </Suspense>
      <MenuClientWrapper
        selectedCategory={searchParams.category || ""}
        categories={categoriesWithQuantity}
        menuItems={menuItems}
      />
    </div>
  );
}
