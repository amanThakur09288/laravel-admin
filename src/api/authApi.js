import axios from "axios";
import api from "./axios";

const backend = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: true,
  headers: {
    Accept: "application/json",
  },
});

export const getCsrfCookie = async () => {
  await backend.get("/sanctum/csrf-cookie");
};

export const login = async (data) => {
  await getCsrfCookie();
  const response = await api.post("/login", data);
  return response.data;
};

export const getCurrentUser = async () => {
  const response = await api.get("/user");
  return response.data;
};

export const logout = async () => {
  const response = await api.post("/logout");
  return response.data;
};
