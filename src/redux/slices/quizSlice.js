import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  quizzes: [],
  loading: false,
  error: null,
};

const quizSlice = createSlice({
  name: "quiz",

  initialState,

  reducers: {
    setQuizzes: (state, action) => {
      state.quizzes = action.payload;
    },

    addQuiz: (state, action) => {
      state.quizzes.unshift(action.payload);
    },

    updateQuiz: (state, action) => {
      const index = state.quizzes.findIndex(
        (quiz) => quiz.id === action.payload.id
      );

      if (index !== -1) {
        state.quizzes[index] = action.payload;
      }
    },

    removeQuiz: (state, action) => {
      state.quizzes = state.quizzes.filter(
        (quiz) => quiz.id !== action.payload
      );
    },

    setLoading: (state, action) => {
      state.loading = action.payload;
    },

    setError: (state, action) => {
      state.error = action.payload;
    },

    clearError: (state) => {
      state.error = null;
    },
  },
});

export const {
  setQuizzes,
  addQuiz,
  updateQuiz,
  removeQuiz,
  setLoading,
  setError,
  clearError,
} = quizSlice.actions;

export default quizSlice.reducer;