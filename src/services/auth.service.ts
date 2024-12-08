"use server";

import axios from "@/utils/axios";
import { handleApiError } from "@/utils/api-error";
import { AuthError } from "next-auth";

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
