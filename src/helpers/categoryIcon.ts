export function getCategoryIcon(categoryName: string): string {
  const defaultIcon = "/images/category/mage_dashboard-fill.png";
  const iconMap: { [key: string]: string } = {
    Starters: "/images/category/Food And Wine.png",
    "Salad & Soup": "/images/category/Salad.png",
    Mains: "/images/category/Meal.png",
    Breakfast: "/images/category/Cafe.png",
    "Burgers & Pizza": "/images/category/Pizza.png",
    Drinks: "/images/category/Champagne Bottle.png",
  };

  return iconMap[categoryName] || defaultIcon;
}
