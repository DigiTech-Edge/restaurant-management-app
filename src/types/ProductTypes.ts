export interface Product {
  id: string;
  name: string;
  ingredients: string;
  category: string;
  price: number;
  availability: "Available" | "Unavailable";
}
