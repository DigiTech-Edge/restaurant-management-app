"use server";

import axios from "@/utils/axios";
import { handleApiError } from "@/utils/api-error";
import { AuthError } from "next-auth";
import { RestaurantData } from "@/types/next-auth";
import { auth, unstable_update } from "@/utils/auth/auth";

export async function authenticate(email: string, password: string) {
  try {
    const response = await axios.post("/auth/login", {
      email,
      password,
    });

    if (!response.data) {
      throw new AuthError({
        type: "CredentialsSignin",
        message: "Invalid credentials",
      });
    }

    return response.data;
  } catch (error) {
    if (error instanceof AuthError) {
      throw error;
    }
    handleApiError(error);
  }
}

export async function authenticateWithGoogle(email: string, googleId: string) {
  try {
    const response = await axios.post("/auth/google", {
      email,
      googleId,
    });

    if (!response.data) {
      throw new AuthError({
        type: "GoogleSignin",
        message: "No response received from authentication server",
      });
    }

    if (!response.data.restaurantData) {
      throw new AuthError({
        type: "GoogleSignin",
        message: "Restaurant data not found for this Google account",
      });
    }

    return response.data;
  } catch (error) {
    if (error instanceof AuthError) {
      throw error;
    }
    handleApiError(error);
  }
}

export async function updatePassword(email: string, password: string) {
  try {
    const response = await axios.patch("/auth/update-password", {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
}

export async function updateProfile(
  data: Partial<Omit<RestaurantData, "id" | "rating" | "password" | "token">>
) {
  try {
    const session = await auth();

    if (!session?.user?.accessToken || !session?.user?.id) {
      throw new Error("Unauthorized");
    }

    const response = await axios.patch("/restaurant/profile", data, {
      headers: {
        Authorization: `${session?.user?.accessToken}`,
      },
    });

    if (response.data?.restaurantData) {
      await unstable_update({
        user: {
          restaurant: {
            ...response.data.restaurantData,
          },
        },
      });
    }

    return response.data;
  } catch (error) {
    handleApiError(error);
  }
}
