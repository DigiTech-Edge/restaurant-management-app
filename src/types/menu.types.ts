export interface Category {
  id: string;
  name: string;
  restaurantId: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface MenuItem {
  id: string;
  name: string;
  price: number;
  description: string;
  categoryId: string;
  restaurantId: string;
  available: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateMenuItemRequest {
  name: string;
  price: number;
  description: string;
  categoryId: string;
  available: boolean;
}

export interface UpdateMenuItemRequest {
  name?: string;
  price?: number;
  description?: string;
  categoryId?: string;
  available?: boolean;
}

export interface CreateCategoryRequest {
  name: string;
}

export interface UpdateCategoryRequest {
  name: string;
}

export interface ApiResponse<T> {
  message: string;
  data: T;
}

export interface GetCategoriesResponse {
  message: string;
  categories: Category[];
}
