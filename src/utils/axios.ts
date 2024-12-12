import axios from "axios";

const baseURL = "https://api-resturant-management.onrender.com/restaurant";

export default axios.create({
  baseURL,
  withCredentials: true,
});
