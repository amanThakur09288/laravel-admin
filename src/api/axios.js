import axios from "axios";
import { store } from "../redux/store";
import { clearUser } from "../redux/slices/authSlice";
import { navigateToLogin } from "../utils/navigation";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,

  withCredentials: true,
  withXSRFToken: true,

  xsrfCookieName: "XSRF-TOKEN",
  xsrfHeaderName: "X-XSRF-TOKEN",

  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

// Request Interceptor
api.interceptors.request.use(
  (config) => {
    console.log("API Request:", config.method?.toUpperCase(), config.url);

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Response Interceptor
api.interceptors.response.use(
  (response) => {
    console.log("API Response:", response.status);

    return response;
  },

  (error) => {
    console.error("API Error:", error.response?.data);

    if (error.response?.status === 401) {
      console.log("Session expired. Logging out...");

      // Clear Redux authentication
      store.dispatch(clearUser());

      // React Router navigation without page refresh
      if (window.location.pathname !== "/login") {
        navigateToLogin();
      }
    }

    return Promise.reject(error);
  },
);

export default api;
