import api from "./axios";

export const getContactMessages = async () => {
  const response = await api.get("/contact-messages");
  return response.data;
};

export const getContactMessage = async (id) => {
  const response = await api.get(`/contact-messages/${id}`);
  return response.data;
};

export const deleteContactMessage = async (id) => {
  const response = await api.delete(`/contact-messages/${id}`);
  return response.data;
};