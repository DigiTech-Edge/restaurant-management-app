import ky from "ky";

const baseURL = "https://api-resturant-management.onrender.com/restaurant";

// Create a preconfigured ky instance
const api = ky.create({
  prefixUrl: baseURL,
  credentials: "include",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 30000, // 30 seconds timeout
  retry: {
    limit: 2,
    methods: ["get", "post", "put", "patch", "delete"],
    statusCodes: [408, 413, 429, 500, 502, 503, 504],
  },
  hooks: {
    beforeRequest: [
      (request) => {
        // You can add any request interceptors here
      },
    ],
    afterResponse: [
      async (_request, _options, response) => {
        if (!response.ok) {
          const errorData = await response.clone().json();
          const error = new Error(
            errorData.error?.message ||
              errorData.message ||
              "An unexpected error occurred"
          );
          error.name = "ApiError";
          (error as any).response = {
            data: errorData.error.message,
            status: response.status,
          };
          throw error;
        }
      },
    ],
  },
});

// Helper to remove leading slash from URLs
const removeLeadingSlash = (url: string) => url.replace(/^\/+/, "");

// Helper to wrap response in axios-like format
const wrapResponse = async (promise: Promise<any>): Promise<{ data: any }> => {
  try {
    const data = await promise;
    return { data };
  } catch (error: any) {
    // Don't wrap or modify the error, just propagate it
    throw error;
  }
};

const axios = {
  get: (url: string, config?: any) =>
    wrapResponse(api.get(removeLeadingSlash(url), config).json()),
  post: (url: string, data?: any, config?: any) =>
    wrapResponse(
      api.post(removeLeadingSlash(url), { json: data, ...config }).json()
    ),
  put: (url: string, data?: any, config?: any) =>
    wrapResponse(
      api.put(removeLeadingSlash(url), { json: data, ...config }).json()
    ),
  patch: (url: string, data?: any, config?: any) =>
    wrapResponse(
      api.patch(removeLeadingSlash(url), { json: data, ...config }).json()
    ),
  delete: (url: string, config?: any) =>
    wrapResponse(api.delete(removeLeadingSlash(url), config).json()),
  create: () => {
    throw new Error(
      "create() is not needed with ky - use the default export directly"
    );
  },
};

export default axios;
