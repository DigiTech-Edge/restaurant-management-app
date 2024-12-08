import { AxiosError } from "axios";

export class ApiError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ApiError";
  }
}

export function handleApiError(error: unknown): never {
  console.log("Error object:", error);

  // Handle error as Response object
  if (typeof error === "object" && error !== null) {
    const errorObj = error as any;
    
    // Try to get the error message from the response structure
    const errorMessage =
      errorObj.response?.data?.error?.message ||
      errorObj.response?.data?.message ||
      errorObj.message ||
      "An unexpected error occurred";

    throw new ApiError(errorMessage);
  }

  // Fallback for other error types
  if (error instanceof Error) {
    throw new ApiError(error.message);
  }

  throw new ApiError("An unexpected error occurred");
}
