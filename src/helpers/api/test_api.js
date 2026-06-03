import axios from "axios";

const test_api = axios.create({
  baseURL: "https://breakout.bvmwebsolutions.com/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default test_api;
