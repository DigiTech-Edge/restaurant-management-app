import axios from "axios";

const baseURL = "https://api-resturant-management.onrender.com/restaurant";

export default axios.create({
  baseURL,
  withCredentials: true,
  adapter:
    typeof window !== "undefined"
      ? undefined // Use default adapter in browser
      : async function (config) {
          // Use fetch in Edge Runtime
          const url = baseURL + config.url;

          // Convert headers to a plain object with string values
          const headers: Record<string, string> = {
            "Content-Type": "application/json",
          };

          if (config.headers) {
            Object.entries(config.headers).forEach(([key, value]) => {
              if (value !== undefined && value !== null) {
                headers[key] = String(value);
              }
            });
          }

          const options: RequestInit = {
            method: config.method?.toUpperCase(),
            headers,
            credentials: "include" as RequestCredentials,
            body: config.data ? JSON.stringify(config.data) : undefined,
          };

          const response = await fetch(url, options);
          const data = await response.json();

          return {
            data,
            status: response.status,
            statusText: response.statusText,
            headers: Object.fromEntries(response.headers),
            config,
          };
        },
});
