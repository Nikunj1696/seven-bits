import axios from "axios";
import constants from "../utils/constants";

axios.interceptors.request.use(
  (config) => {
    config.baseURL = constants.API_URL;

    const token = localStorage.getItem("accessToken");

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

export { axios };
