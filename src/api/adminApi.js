import api from "./axios";

export const getAdmins = async () => {
  const response = await api.get("/admin-users");
  return response.data;
};

export const createAdmin = async (data) => {
  const response = await api.post("/admin-users", data);
  return response.data;
};

export const updateAdmin = async (id, data) => {
  const response = await api.put(`/admin-users/${id}`, data);
  return response.data;
};

export const updateAdminStatus = async (id, is_active) => {
  const response = await api.patch(`/admin-users/${id}/status`, {
    is_active,
  });

  return response.data;
};