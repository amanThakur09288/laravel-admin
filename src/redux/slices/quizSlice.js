import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  quizzes: [],
  selectedQuiz: null,
};

const quizSlice = createSlice({
  name: "quiz",

  initialState,

  reducers: {
    setQuizzes: (state, action) => {
      state.quizzes = action.payload;
    },

    setSelectedQuiz: (state, action) => {
      state.selectedQuiz = action.payload;
    },

    addQuiz: (state, action) => {
      state.quizzes.unshift(action.payload);
    },

    updateQuizInList: (state, action) => {
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

    clearSelectedQuiz: (state) => {
      state.selectedQuiz = null;
    },
  },
});

export const {
  setQuizzes,
  setSelectedQuiz,
  addQuiz,
  updateQuizInList,
  removeQuiz,
  clearSelectedQuiz,
} = quizSlice.actions;

export default quizSlice.reducer;