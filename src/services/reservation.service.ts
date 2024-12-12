"use server";

import axios from "@/utils/axios";
import { auth } from "@/utils/auth/auth";
import { revalidatePath } from "next/cache";
import { handleApiError } from "@/utils/api-error";
import {
  CreateTableRequest,
  UpdateTableRequest,
  CreateReservationRequest,
  UpdateReservationRequest,
  TablesApiResponse,
  ReservationsApiResponse,
} from "@/types/reservation.types";

// Table Management
export async function createTable(data: CreateTableRequest) {
  try {
    const session = await auth();
    if (!session?.user?.accessToken || !session.user.id) {
      throw new Error("Unauthorized");
    }

    const response = await axios.post(
      `/main/create-table/${session.user.id}`,
      data,
      {
        headers: {
          Authorization: `${session.user.accessToken}`,
        },
      }
    );

    revalidatePath("/reservations");
    return response.data.newTable as TablesApiResponse;
  } catch (error) {
    handleApiError(error);
  }
}

export async function updateTable(tableId: string, data: UpdateTableRequest) {
  try {
    const session = await auth();
    if (!session?.user?.accessToken) {
      throw new Error("Unauthorized");
    }

    const response = await axios.put(`/main/update-table/${tableId}`, data, {
      headers: {
        Authorization: `${session.user.accessToken}`,
      },
    });

    revalidatePath("/reservations");
    return response.data.updatedTable as TablesApiResponse;
  } catch (error) {
    handleApiError(error);
  }
}

export async function getTable(tableNumber: number) {
  try {
    const session = await auth();
    if (!session?.user?.accessToken || !session.user.id) {
      throw new Error("Unauthorized");
    }

    const response = await axios.get(
      `/main/get-table?restaurantId=${session.user.id}&tableNumber=${tableNumber}`,
      {
        headers: {
          Authorization: `${session.user.accessToken}`,
        },
      }
    );

    return response.data as TablesApiResponse;
  } catch (error) {
    handleApiError(error);
  }
}

export async function deleteTable(tableId: string) {
  try {
    const session = await auth();
    if (!session?.user?.accessToken) {
      throw new Error("Unauthorized");
    }

    const response = await axios.delete(`/main/delete-table/${tableId}`, {
      headers: {
        Authorization: `${session.user.accessToken}`,
      },
    });

    revalidatePath("/reservations");
    return response.data as TablesApiResponse;
  } catch (error) {
    handleApiError(error);
  }
}

export async function getAllTables() {
  try {
    const session = await auth();
    if (!session?.user?.accessToken || !session.user.id) {
      throw new Error("Unauthorized");
    }

    const response = await axios.get(
      `/main/get-all-tables/${session.user.id}`,
      {
        headers: {
          Authorization: `${session.user.accessToken}`,
        },
      }
    );

    return response.data as TablesApiResponse;
  } catch (error) {
    handleApiError(error);
  }
}

// Reservation Management
export async function createReservation(data: CreateReservationRequest) {
  try {
    const session = await auth();
    if (!session?.user?.accessToken || !session.user.id) {
      throw new Error("Unauthorized");
    }

    const response = await axios.post(
      `/main/add-reservation/${session.user.id}`,
      data,
      {
        headers: {
          Authorization: `${session.user.accessToken}`,
        },
      }
    );

    revalidatePath("/reservations");
    return response.data as ReservationsApiResponse;
  } catch (error) {
    handleApiError(error);
  }
}

export async function updateReservation(
  reservationId: string,
  data: CreateReservationRequest
) {
  try {
    const session = await auth();
    if (!session?.user?.accessToken) {
      throw new Error("Unauthorized");
    }

    const response = await axios.put(
      `/main/update-reservation/${reservationId}`,
      data,
      {
        headers: {
          Authorization: `${session.user.accessToken}`,
        },
      }
    );

    revalidatePath("/reservations");
    return response.data as ReservationsApiResponse;
  } catch (error) {
    handleApiError(error);
  }
}

export async function getReservations() {
  try {
    const session = await auth();
    if (!session?.user?.accessToken || !session.user.id) {
      throw new Error("Unauthorized");
    }

    const response = await axios.get(
      `/main/get-reservations/${session.user.id}`,
      {
        headers: {
          Authorization: `${session.user.accessToken}`,
        },
      }
    );

    return response.data as ReservationsApiResponse;
  } catch (error) {
    handleApiError(error);
  }
}

export async function getReservation(reservationId: string) {
  try {
    const session = await auth();
    if (!session?.user?.accessToken) {
      throw new Error("Unauthorized");
    }

    const response = await axios.get(`/main/get-reservation/${reservationId}`, {
      headers: {
        Authorization: `${session.user.accessToken}`,
      },
    });

    return response.data as ReservationsApiResponse;
  } catch (error) {
    handleApiError(error);
  }
}
