import axios from "./axios";

/*
|--------------------------------------------------------------------------
| Quiz CRUD
|--------------------------------------------------------------------------
*/

export const getQuizzes = async () => {
  const response = await axios.get("/admin/quizzes");

  return response.data;
};

export const getQuiz = async (id) => {
  const response = await axios.get(`/admin/quizzes/${id}`);

  return response.data;
};

export const createQuiz = async (data) => {
  const response = await axios.post(
    "/admin/quizzes",
    data
  );

  return response.data;
};

export const updateQuiz = async (id, data) => {
  const response = await axios.put(
    `/admin/quizzes/${id}`,
    data
  );

  return response.data;
};

export const deleteQuiz = async (id) => {
  const response = await axios.delete(
    `/admin/quizzes/${id}`
  );

  return response.data;
};


/*
|--------------------------------------------------------------------------
| Quiz Questions
|--------------------------------------------------------------------------
*/

export const addQuestionsToQuiz = async (
  quizId,
  questionIds
) => {
  const response = await axios.post(
    `/admin/quizzes/${quizId}/questions`,
    {
      question_ids: questionIds,
    }
  );

  return response.data;
};

export const updateQuizQuestionOrder = async (
  quizId,
  questionIds
) => {
  const response = await axios.put(
    `/admin/quizzes/${quizId}/questions/order`,
    {
      question_ids: questionIds,
    }
  );

  return response.data;
};

export const updateQuizQuestion = async (
  quizId,
  questionId,
  sortOrder
) => {
  const response = await axios.put(
    `/admin/quizzes/${quizId}/questions/${questionId}`,
    {
      sort_order: sortOrder,
    }
  );

  return response.data;
};

export const removeQuestionFromQuiz = async (
  quizId,
  questionId
) => {
  const response = await axios.delete(
    `/admin/quizzes/${quizId}/questions/${questionId}`
  );

  return response.data;
};