// import axios from "axios";
// import { store } from "../redux/store";
// import { clearUser } from "../redux/slices/authSlice";
// import { navigateToLogin } from "../utils/navigation";

// const API_BASE_URL = import.meta.env.VITE_API_BASE_URL?.replace(/\/+$/, "");

// if (!API_BASE_URL) {
//   throw new Error("VITE_API_BASE_URL is missing from your environment.");
// }

// const api = axios.create({
//   baseURL: API_BASE_URL,
//   withCredentials: true,
//   withXSRFToken: true,
//   xsrfCookieName: "XSRF-TOKEN",
//   xsrfHeaderName: "X-XSRF-TOKEN",
//   headers: {
//     Accept: "application/json",
//   },
// });

// // Request interceptor
// api.interceptors.request.use(
//   (config) => {
//     // Let Axios set the multipart boundary automatically.
//     if (
//       typeof FormData !== "undefined" &&
//       config.data instanceof FormData
//     ) {
//       config.headers.delete?.("Content-Type");
//       if (config.headers["Content-Type"]) {
//         delete config.headers["Content-Type"];
//       }
//     }

//     console.log(
//       "API Request:",
//       config.method?.toUpperCase(),
//       config.baseURL,
//       config.url,
//     );

//     return config;
//   },
//   (error) => Promise.reject(error),
// );

// // Response interceptor
// api.interceptors.response.use(
//   (response) => {
//     console.log("API Response:", response.status, response.config.url);
//     return response;
//   },
//   (error) => {
//     console.error("API Error:", {
//       url: error.config?.url,
//       status: error.response?.status,
//       data: error.response?.data,
//       message: error.message,
//     });

//     if (
//       error.response?.status === 401 &&
//       window.location.pathname !== "/login"
//     ) {
//       store.dispatch(clearUser());
//       navigateToLogin();
//     }

//     return Promise.reject(error);
//   },
// );

// export default api;

import axios from "axios";

const apiBaseURL = import.meta.env.VITE_API_BASE_URL;

const api = axios.create({
  baseURL: apiBaseURL,
  timeout: 15000,
  withCredentials: true,
  withXSRFToken: true,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    "X-Requested-With": "XMLHttpRequest",
  },
});

export const getCsrfCookie = async () => {
  const apiOrigin = new URL(apiBaseURL).origin;

  return axios.get(`${apiOrigin}/sanctum/csrf-cookie`, {
    withCredentials: true,
    withXSRFToken: true,
    headers: {
      Accept: "application/json",
      "X-Requested-With": "XMLHttpRequest",
    },
  });
};

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      console.error("API Error:", {
        status: error.response.status,
        url: error.config?.url,
        data: error.response.data,
      });
    } else {
      console.error("Network/API Error:", error.message);
    }

    return Promise.reject(error);
  },
);

export default api;
