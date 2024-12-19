import { ORDER_STATUS } from "../lib/constants";

export type OrderStatus = (typeof ORDER_STATUS)[keyof typeof ORDER_STATUS];

export interface OrderItem {
  id: string;
  quantity: number;
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  available: boolean;
  price: number;
  restaurantId: string;
  categoryId: string;
  orderId: string;
}

export interface Table {
  id: string;
  number: number;
  capacity: number;
  restaurantId: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  date: string;
  type: "dine_in" | "takeout" | "delivery";
  status: OrderStatus;
  total: number;
  restaurantId: string;
  tableId?: string;
  items: OrderItem[];
  menuItems: MenuItem[];
  table?: Table;
}

export interface GetOrdersResponse {
  message: string;
  orders: Order[];
}

export interface CreateOrderRequest {
  type: "dine_in" | "takeout" | "delivery";
  tableId?: string;
  items: OrderItem[];
}

export interface UpdateOrderRequest {
  status?: OrderStatus;
  items?: OrderItem[];
}

export type ApiResponse<T> = {
  message: string;
  data?: T;
};

export interface FormattedOrderItem {
  name: string;
  quantity: number;
  description: string;
  price: number;
}

export interface FormattedOrder {
  orders: FormattedOrderItem[];
  orderTime: string;
  tableNumber: string;
  orderNumber: string;
  paymentMethod: string;
  orderType: string;
  status: OrderStatus;
}

export interface InvoiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  orders: FormattedOrderItem[];
  orderNumber: string;
  orderTime: string;
  tableNumber: string;
  paymentMethod: string;
  orderType: string;
  isCompleted: boolean;
}

export interface InvoicePDFProps {
  orders: FormattedOrderItem[];
  orderNumber: string;
  total: number;
}
