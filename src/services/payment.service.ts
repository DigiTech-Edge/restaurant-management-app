"use server";

import { auth } from "@/utils/auth/auth";
import axios from "@/utils/axios";
import { handleApiError } from "@/utils/api-error";
import { revalidatePath } from "next/cache";
import { ORDER_STATUS } from "@/lib/constants";

export async function generatePaymentQRCode(orderId: string) {
  // Generate a unique payment token that includes the orderId
  const paymentToken = `${orderId}_${Date.now()}`;

  // In a real application, you would store this token in a database
  // and associate it with the order

  return paymentToken;
}

export async function verifyPayment(paymentToken: string) {
  try {
    const session = await auth();
    if (!session?.user?.id || !session?.user?.accessToken) {
      throw new Error("Unauthorized");
    }

    // Extract orderId from payment token
    const orderId = paymentToken.split("_")[0];

    // Update order status to paid
    const response = await axios.put(
      `/main/update-order-status/${orderId}`,
      { status: ORDER_STATUS.PAID },
      {
        headers: {
          Authorization: ` ${session.user.accessToken}`,
        },
      }
    );

    revalidatePath("/orders");
    return response.data;
  } catch (error) {
    handleApiError(error);
    throw error;
  }
}
