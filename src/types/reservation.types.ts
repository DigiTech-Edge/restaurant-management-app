export interface Table {
  id: string;
  number: number;
  capacity: number;
  restaurantId: string;
  reservations: Reservation[];
  orders: any[]; // You can define a proper Order type if needed
}

export interface Reservation {
  id: string;
  name: string;
  phone: string;
  numberOfGuests: number;
  tableId: string;
  date: string;
  time: string;
  restaurantId: string;
  status: ReservationStatus;
  createdAt: string;
  updatedAt: string;
}

export type ReservationStatus =
  | "pending"
  | "confirmed"
  | "cancelled"
  | "completed";

export interface CreateTableRequest {
  number: number;
  capacity: number;
}

export interface UpdateTableRequest {
  number?: number;
  capacity?: number;
}

export interface CreateReservationRequest {
  name: string;
  phone: string;
  numberOfGuests: number;
  tableId: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:MM
}

export interface UpdateReservationRequest {
  status: ReservationStatus;
}

export interface TablesApiResponse {
  message: string;
  tables: Table[];
}

export interface ReservationsApiResponse {
  message: string;
  reservations: Reservation[];
}

export interface ApiResponse<T> {
  message: string;
  data?: T;
}
