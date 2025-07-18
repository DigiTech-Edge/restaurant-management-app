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

//foodMenu.ts
export const foodMenu: Record<string, { id: number; name: string; description: string; price: string }[]> = {
  Starters: [
    {
      id: 1,
      name: 'Spring Rolls',
      description: 'Crispy rolls stuffed with veggies and noodles, served with sweet chili dip.',
      price: '$6.99',
    },
    {
      id: 2,
      name: 'Garlic Bread',
      description: 'Toasted baguette with garlic butter and herbs.',
      price: '$4.50',
    },
  ],
  'Salad & Soup': [
    {
      id: 3,
      name: 'Greek Salad',
      description: 'Fresh cucumbers, tomatoes, olives, feta cheese with olive oil dressing.',
      price: '$9.99',
    },
    {
      id: 4,
      name: 'Chicken Noodle Soup',
      description: 'Warm chicken broth with shredded chicken, noodles, and veggies.',
      price: '$8.00',
    },
  ],
  Mains: [
    {
      id: 5,
      name: 'Grilled Salmon',
      description: 'Fresh salmon grilled to perfection, served with seasonal veggies.',
      price: '$17.99',
    },
    {
      id: 6,
      name: 'Steak & Fries',
      description: 'Juicy sirloin steak with crispy fries and garlic butter sauce.',
      price: '$21.50',
    },
  ],
  Breakfast: [
    {
      id: 7,
      name: 'Pancake Stack',
      description: 'Fluffy pancakes with maple syrup and berries.',
      price: '$7.99',
    },
    {
      id: 8,
      name: 'English Breakfast',
      description: 'Eggs, sausage, toast, beans, and grilled tomato.',
      price: '$10.99',
    },
  ],
  'Burgers & Pizza': [
    {
      id: 9,
      name: 'Cheeseburger',
      description: 'Beef patty with cheese, lettuce, tomato, and our secret sauce.',
      price: '$11.00',
    },
    {
      id: 10,
      name: 'Margherita Pizza',
      description: 'Classic pizza with mozzarella, basil, and tomato sauce.',
      price: '$13.50',
    },
  ],
  Drinks: [
    {
      id: 11,
      name: 'Mojito',
      description: 'Refreshing lime and mint cocktail.',
      price: '$6.00',
    },
    {
      id: 12,
      name: 'Lemonade',
      description: 'Fresh-squeezed lemons with a splash of sugar.',
      price: '$4.00',
    },
  ],
}
