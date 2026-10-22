// import api from "./axios";

// export const getQuizzes = async () => {
//   const response = await api.get("/admin/quizzes");

//   return response.data;
// };

// export const getQuiz = async (id) => {
//   const response = await api.get(`/admin/quizzes/${id}`);

//   return response.data;
// };

// export const createQuiz = async (data) => {
//   const response = await api.post("/admin/quizzes", data);

//   return response.data;
// };

// export const updateQuiz = async (id, data) => {
//   const response = await api.put(`/admin/quizzes/${id}`, data);

//   return response.data;
// };

// export const deleteQuiz = async (id) => {
//   const response = await api.delete(`/admin/quizzes/${id}`);

//   return response.data;
// };
import api from "./axios";

export const getQuizzes = async () => {
  const response = await api.get("/quizzes");

  return response.data;
};

export const getQuiz = async (id) => {
  const response = await api.get(`/quizzes/${id}`);

  return response.data;
};

export const createQuiz = async (data) => {
  const response = await api.post("/quizzes", data);

  return response.data;
};

export const updateQuiz = async (id, data) => {
  const response = await api.put(`/quizzes/${id}`, data);

  return response.data;
};

export const deleteQuiz = async (id) => {
  const response = await api.delete(`/quizzes/${id}`);

  return response.data;
};