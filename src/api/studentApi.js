import api from "./axios";

export const getStudents = async (params = {}) => {
  const response = await api.get("/students", { params });
  return response.data;
};

export const getStudent = async (id) => {
  const response = await api.get(`/students/${id}`);
  return response.data;
};

export const updateStudent = async (id, data) => {
  const response = await api.put(`/students/${id}`, data);
  return response.data;
};

export const updateStudentStatus = async (id, isActive) => {
  const response = await api.patch(`/students/${id}/status`, {
    is_active: isActive,
  });

  return response.data;
};

export const deleteStudent = async (id) => {
  const response = await api.delete(`/students/${id}`);
  return response.data;
};