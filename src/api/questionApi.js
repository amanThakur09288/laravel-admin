// import axios from "./axios";

// // Get all questions
// export const getQuestions = async () => {
//   const response = await axios.get("/admin/questions");
//   return response.data;
// };

// // Get single question
// export const getQuestion = async (id) => {
//   const response = await axios.get(`/admin/questions/${id}`);
//   return response.data;
// };

// // Create question
// export const createQuestion = async (data) => {
//   const response = await axios.post("/admin/questions", data);
//   return response.data;
// };

// // Update question
// export const updateQuestion = async (id, data) => {
//   const response = await axios.put(`/admin/questions/${id}`, data);
//   return response.data;
// };

// // Delete question
// export const deleteQuestion = async (id) => {
//   const response = await axios.delete(`/admin/questions/${id}`);
//   return response.data;
// };

// // Add questions to quiz
// export const addQuestionsToQuiz = async (quizId, questionIds) => {
//   const response = await axios.post(
//     `/admin/quizzes/${quizId}/questions`,
//     {
//       question_ids: questionIds,
//     }
//   );

//   return response.data;
// };

// // Update question order inside quiz
// export const updateQuizQuestionOrder = async (
//   quizId,
//   questionIds
// ) => {
//   const response = await axios.put(
//     `/admin/quizzes/${quizId}/questions/order`,
//     {
//       question_ids: questionIds,
//     }
//   );

//   return response.data;
// };

// // Update single quiz question order
// export const updateQuizQuestion = async (
//   quizId,
//   questionId,
//   sortOrder
// ) => {
//   const response = await axios.put(
//     `/admin/quizzes/${quizId}/questions/${questionId}`,
//     {
//       sort_order: sortOrder,
//     }
//   );

//   return response.data;
// };

// // Remove question from quiz
// export const removeQuestionFromQuiz = async (
//   quizId,
//   questionId
// ) => {
//   const response = await axios.delete(
//     `/admin/quizzes/${quizId}/questions/${questionId}`
//   );

//   return response.data;
// };

import axios from "./axios";

export const getQuestions = async () => {
  const response = await axios.get("/admin/questions");

  return response.data;
};

export const getQuestion = async (id) => {
  const response = await axios.get(`/admin/questions/${id}`);

  return response.data;
};

export const createQuestion = async (data) => {
  const response = await axios.post("/admin/questions", data);

  return response.data;
};

export const updateQuestion = async (id, data) => {
  const response = await axios.put(`/admin/questions/${id}`, data);

  return response.data;
};

export const deleteQuestion = async (id) => {
  const response = await axios.delete(`/admin/questions/${id}`);

  return response.data;
};

export const addQuestionsToQuiz = async (quizId, questionIds) => {
  const response = await axios.post(`/admin/quizzes/${quizId}/questions`, {
    question_ids: questionIds,
  });

  return response.data;
};

export const updateQuizQuestionOrder = async (quizId, questionIds) => {
  const response = await axios.put(`/admin/quizzes/${quizId}/questions/order`, {
    question_ids: questionIds,
  });

  return response.data;
};

export const updateQuizQuestion = async (quizId, questionId, sortOrder) => {
  const response = await axios.put(
    `/admin/quizzes/${quizId}/questions/${questionId}`,
    {
      sort_order: sortOrder,
    },
  );

  return response.data;
};

export const removeQuestionFromQuiz = async (quizId, questionId) => {
  const response = await axios.delete(
    `/admin/quizzes/${quizId}/questions/${questionId}`,
  );

  return response.data;
};
