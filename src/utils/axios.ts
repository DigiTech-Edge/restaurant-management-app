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
        // You can add any response interceptors here
        if (!response.ok) {
          // Try to get detailed error message from response
          try {
            const errorData = await response.clone().json();
            throw new Error(
              `Server Error (${response.status}): ${
                errorData.message || JSON.stringify(errorData)
              }`
            );
          } catch {
            // If can't parse JSON, throw basic error
            throw new Error(`HTTP Error: ${response.status}`);
          }
        }
      },
    ],
  },
});

// Helper to remove leading slash from URLs
const removeLeadingSlash = (url: string) => url.replace(/^\/+/, "");

// Helper to wrap response in axios-like format
const wrapResponse = async (promise: Promise<any>): Promise<{ data: any }> => {
  const data = await promise;
  return { data };
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
