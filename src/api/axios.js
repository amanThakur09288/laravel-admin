import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
    },
});

// Request Interceptor
api.interceptors.request.use(
    (config) => {
        console.log(
            "API Request:",
            config.method?.toUpperCase(),
            config.url
        );

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response Interceptor
api.interceptors.response.use(
    (response) => {
        console.log("API Response:", response.status);

        return response;
    },
    (error) => {
        console.error("API Error:", error.response?.data);

        return Promise.reject(error);
    }
);

export default api;