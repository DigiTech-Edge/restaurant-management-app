"use server";

import { auth } from "@/utils/auth/auth";
import axios from "@/utils/axios";
import { handleApiError } from "@/utils/api-error";
import { revalidatePath } from "next/cache";
import {
  ApiResponse,
  Category,
  CreateCategoryRequest,
  CreateMenuItemRequest,
  GetCategoriesResponse,
  MenuItem,
  UpdateCategoryRequest,
  UpdateMenuItemRequest,
} from "@/types/menu.types";

// Helper function to get all categories
export async function getAllCategories() {
  try {
    const session = await auth();
    if (!session?.user?.id || !session?.user?.accessToken) {
      throw new Error("Unauthorized");
    }

    const response = await axios.get(
      `/main/get-all-categories/${session.user.id}`,
      {
        headers: {
          Authorization: ` ${session.user.accessToken}`,
        },
      }
    );

    const data = response.data as GetCategoriesResponse;
    return data.categories;
  } catch (error) {
    handleApiError(error);
  }
}

// Category Management
export async function createCategory(data: CreateCategoryRequest) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      throw new Error("Unauthorized");
    }

    const response = await axios.post(
      `/main/create-category/${session.user.id}`,
      data,
      {
        headers: {
          Authorization: `${session.user.accessToken}`,
        },
      }
    );

    revalidatePath("/menu");
    return response.data as ApiResponse<Category>;
  } catch (error) {
    handleApiError(error);
  }
}

export async function updateCategory(id: string, data: UpdateCategoryRequest) {
  try {
    const session = await auth();
    if (!session?.user?.accessToken) {
      throw new Error("Unauthorized");
    }

    console.log(id, data);
    const response = await axios.put(`/main/update-category/${id}`, data, {
      headers: {
        Authorization: `${session.user.accessToken}`,
      },
    });

    revalidatePath("/menu");
    return response.data as ApiResponse<Category>;
  } catch (error) {
    handleApiError(error);
  }
}

export async function deleteCategory(categoryId: string): Promise<void> {
  try {
    const session = await auth();
    if (!session?.user?.accessToken) {
      throw new Error("Unauthorized");
    }

    await axios.delete(`/main/delete-category/${categoryId}`, {
      headers: {
        Authorization: `${session.user.accessToken}`,
      },
    });

    revalidatePath("/menu");
  } catch (error) {
    handleApiError(error);
  }
}

// Menu Item Management
export async function createMenuItem(data: CreateMenuItemRequest) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      throw new Error("Unauthorized");
    }

    const response = await axios.post(
      `/main/create-menu-item/${session.user.id}`,
      data,
      {
        headers: {
          Authorization: `${session.user.accessToken}`,
        },
      }
    );

    revalidatePath("/menu");
    return response.data as ApiResponse<MenuItem>;
  } catch (error) {
    handleApiError(error);
  }
}

export async function updateMenuItem(
  menuItemId: string,
  data: UpdateMenuItemRequest
) {
  try {
    const session = await auth();
    if (!session?.user?.accessToken) {
      throw new Error("Unauthorized");
    }

    const response = await axios.put(
      `/main/update-menu-item/${menuItemId}`,
      data,
      {
        headers: {
          Authorization: `${session.user.accessToken}`,
        },
      }
    );

    revalidatePath("/menu");
    return response.data as ApiResponse<MenuItem>;
  } catch (error) {
    handleApiError(error);
  }
}

export async function deleteMenuItem(menuItemId: string) {
  try {
    const session = await auth();
    if (!session?.user?.accessToken) {
      throw new Error("Unauthorized");
    }

    const response = await axios.delete(
      `/main/delete-menu-item/${menuItemId}`,
      {
        headers: {
          Authorization: `${session.user.accessToken}`,
        },
      }
    );

    revalidatePath("/menu");
    return response.data as ApiResponse<void>;
  } catch (error) {
    handleApiError(error);
  }
}

export async function getAllMenuItems(): Promise<MenuItem[]> {
  try {
    const session = await auth();
    if (!session?.user?.id || !session?.user?.accessToken) {
      throw new Error("Unauthorized");
    }

    // console.log(session.user.accessToken, session.user.id);

    const response = await axios.get(
      `/main/get-all-menu-items/${session.user.id}`,
      {
        headers: {
          Authorization: `${session.user.accessToken}`,
        },
      }
    );

    return response.data.menuItems;
  } catch (error) {
    handleApiError(error);
  }
}
