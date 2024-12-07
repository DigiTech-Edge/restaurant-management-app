"use server";

import axios from "@/utils/axios";
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
    throw new AuthError({
      type: "CredentialsSignin",
      message: error instanceof Error ? error.message : "Something went wrong",
    });
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
    throw new Error(error instanceof Error ? error.message : "Failed to update password");
  }
}
