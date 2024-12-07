const axios = require("axios").default;

const baseURL = "https://api-resturant-management.onrender.com/restaurant";

export default axios.create({
  baseURL,
  withCredentials: true,
});
