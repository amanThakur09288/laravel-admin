// import api from "./axios";

// export const getQuizzes = async () => {
//   const response = await api.get("/quizzes");
//   return response.data;
// };

// export const getQuiz = async (id) => {
//   const response = await api.get(`/quizzes/${id}`);
//   return response.data;
// };

// export const createQuiz = async (data) => {
//   const response = await api.post("/quizzes", data);
//   return response.data;
// };

// export const updateQuiz = async (id, data) => {
//   const response = await api.put(`/quizzes/${id}`, data);
//   return response.data;
// };

// export const deleteQuiz = async (id) => {
//   const response = await api.delete(`/quizzes/${id}`);
//   return response.data;
// };

import api from "./axios";

const buildQuizFormData = (data) => {
  const formData = new FormData();

  formData.append("batch_id", String(data.batch_id));
  formData.append("title", data.title || "");
  formData.append("description", data.description || "");

  formData.append(
    "duration_minutes",
    String(data.duration_minutes),
  );

  formData.append(
    "passing_marks",
    String(data.passing_marks),
  );

  formData.append(
    "attempts_allowed",
    String(data.attempts_allowed),
  );

  formData.append(
    "shuffle_questions",
    data.shuffle_questions ? "1" : "0",
  );

  formData.append(
    "shuffle_options",
    data.shuffle_options ? "1" : "0",
  );

  formData.append(
    "auto_submit",
    data.auto_submit ? "1" : "0",
  );

  formData.append(
    "show_result",
    data.show_result ? "1" : "0",
  );

  formData.append(
    "show_correct_answers",
    data.show_correct_answers ? "1" : "0",
  );

  formData.append(
    "status",
    data.status || "draft",
  );

  data.questions.forEach((question, questionIndex) => {
    formData.append(
      `questions[${questionIndex}][question_text]`,
      question.question_text || "",
    );

    formData.append(
      `questions[${questionIndex}][type]`,
      question.type,
    );

    formData.append(
      `questions[${questionIndex}][marks]`,
      String(question.marks),
    );

    formData.append(
      `questions[${questionIndex}][explanation]`,
      question.explanation || "",
    );

    /*
    |--------------------------------------------------------------------------
    | QUESTION IMAGE
    |--------------------------------------------------------------------------
    |
    | VERY IMPORTANT:
    |
    | Only append question_image when it is
    | actually a browser File object.
    |
    | Do NOT append:
    | - null
    | - ""
    | - image URL
    | - blob URL
    | - undefined
    |
    */

    if (
      question.question_image instanceof File
    ) {
      formData.append(
        `questions[${questionIndex}][question_image]`,
        question.question_image,
        question.question_image.name,
      );
    }

    /*
    |--------------------------------------------------------------------------
    | OPTIONS
    |--------------------------------------------------------------------------
    */

    question.options.forEach(
      (option, optionIndex) => {
        formData.append(
          `questions[${questionIndex}][options][${optionIndex}][option_text]`,
          option.option_text || "",
        );

        formData.append(
          `questions[${questionIndex}][options][${optionIndex}][is_correct]`,
          option.is_correct ? "1" : "0",
        );
      },
    );
  });

  return formData;
};

export const getQuizzes = async () => {
  const response = await api.get("/quizzes");

  return response.data;
};

export const getQuiz = async (id) => {
  const response = await api.get(`/quizzes/${id}`);

  return response.data;
};

export const createQuiz = async (data) => {
  const formData = buildQuizFormData(data);

  /*
  |--------------------------------------------------------------------------
  | DEBUG
  |--------------------------------------------------------------------------
  */

  const imageEntry = formData.get(
    "questions[0][question_image]",
  );

  console.log(
    "Quiz image being sent:",
    imageEntry,
  );

  console.log(
    "Is actual File:",
    imageEntry instanceof File,
  );

  /*
  |--------------------------------------------------------------------------
  | CREATE
  |--------------------------------------------------------------------------
  */

  const response = await api.post(
    "/quizzes",
    formData,
  );

  return response.data;
};

export const updateQuiz = async (id, data) => {
  const formData = buildQuizFormData(data);

  /*
  |--------------------------------------------------------------------------
  | Laravel method spoofing
  |--------------------------------------------------------------------------
  */

  formData.append("_method", "PUT");

  const response = await api.post(
    `/quizzes/${id}`,
    formData,
  );

  return response.data;
};

export const deleteQuiz = async (id) => {
  const response = await api.delete(
    `/quizzes/${id}`,
  );

  return response.data;
};