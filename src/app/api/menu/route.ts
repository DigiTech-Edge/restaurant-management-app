import { NextResponse } from "next/server";
import { getAllCategories, getAllMenuItems } from "@/services/menu.service";

export async function GET() {
  try {
    const [categories, menuItems] = await Promise.all([
      getAllCategories(),
      getAllMenuItems(),
    ]);

    // Transform categories to include quantity
    const categoriesWithQuantity = categories.map((category) => ({
      ...category,
      quantity: menuItems.filter((item) => item.categoryId === category.id)
        .length,
    }));

    return NextResponse.json({
      categories: categoriesWithQuantity,
      menuItems,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch menu data" },
      { status: 500 }
    );
  }
}
