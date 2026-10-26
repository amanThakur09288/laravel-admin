import api from "./axios";

export const getQuizResults = async () => {
  const response = await api.get("/quiz-results");
  return response.data;
};

export const getQuizResult = async (attemptId) => {
  const response = await api.get(
    `/quiz-results/${attemptId}`,
  );

  return response.data;
};