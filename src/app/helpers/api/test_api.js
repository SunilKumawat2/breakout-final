import axios from "axios";

const api = axios.create({
  baseURL: "https://breakout.bvmwebsolutions.com/api", //https://breakout.bvmwebsolutions.com
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
