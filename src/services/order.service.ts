"use server";

import { auth } from "@/utils/auth/auth";
import axios from "@/utils/axios";
import { handleApiError } from "@/utils/api-error";
import { revalidatePath } from "next/cache";
import {
  ApiResponse,
  FormattedOrder,
  GetOrdersResponse,
  Order,
  OrderStatus,
} from "@/types/order.types";

export async function getAllOrders() {
  try {
    const session = await auth();
    if (!session?.user?.id || !session?.user?.accessToken) {
      throw new Error("Unauthorized");
    }

    const response = await axios.get(
      `/main/get-all-orders/${session.user.id}`,
      {
        headers: {
          Authorization: ` ${session.user.accessToken}`,
        },
      }
    );

    const data = response.data as GetOrdersResponse;

    // Format orders to match the UI structure
    const formattedOrders: FormattedOrder[] = data.orders.map((order) => ({
      id: order.id,
      orders: order.menuItems.map((item) => ({
        name: item.name,
        quantity:
          order.items.find((orderItem) => orderItem.id === item.id)?.quantity ||
          0,
        description: item.description,
        price: item.price,
      })),
      orderTime: new Date(order.date).toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }),
      tableNumber: order.table?.number.toString() || "N/A",
      orderNumber: order.orderNumber,
      orderType:
        order.type === "dine_in"
          ? "Dine In"
          : order.type === "takeout"
          ? "Take Out"
          : "Delivery",
      status: order.status,
      paymentMethod: order.type === "dine_in" ? "Cash" : "Card",
    }));

    return formattedOrders;
  } catch (error) {
    handleApiError(error);
    return [];
  }
}

export async function getOrder(orderId: string) {
  try {
    const session = await auth();
    if (!session?.user?.id || !session?.user?.accessToken) {
      throw new Error("Unauthorized");
    }

    const response = await axios.get(`/main/get-order/${orderId}`, {
      headers: {
        Authorization: ` ${session.user.accessToken}`,
      },
    });

    const data = response.data as ApiResponse<Order>;
    return data.data;
  } catch (error) {
    handleApiError(error);
  }
}

export async function updateOrderStatus(orderId: string, status: OrderStatus) {
  try {
    const session = await auth();
    if (!session?.user?.id || !session?.user?.accessToken) {
      throw new Error("Unauthorized");
    }

    const response = await axios.put(
      `/main/update-order-status/${orderId}`,
      { status },
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
  }
}
