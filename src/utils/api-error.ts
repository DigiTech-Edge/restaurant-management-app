import { AxiosError } from "axios";

export class ApiError extends Error {
  status?: number;

  constructor(message: string, status?: number) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

export function handleApiError(error: unknown): never {
  console.log("Error object:", error);

  if (typeof error === "object" && error !== null) {
    const errorObj = error as any;
    throw new ApiError(errorObj.message, errorObj.status);
  }

  if (error instanceof Error) {
    throw new ApiError(error.message);
  }

  throw new ApiError("An unexpected error occurred");
}
