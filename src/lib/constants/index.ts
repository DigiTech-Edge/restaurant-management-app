export const categories = [
  { name: "Starters", icon: "Food And Wine" },
  { name: "Salad & Soup", icon: "Salad" },
  { name: "Mains", icon: "Meal" },
  { name: "Breakfast", icon: "Cafe" },
  { name: "Burgers & Pizza", icon: "Pizza" },
  { name: "Drinks", icon: "Champagne Bottle" },
];

export const capacityOptions = [
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "11",
  "12",
];

export const ORDER_STATUS = {
  PENDING: 'pending',
  PROCESSING: 'processing',
  COMPLETED: 'completed',
  PAID: 'paid'
} as const;
