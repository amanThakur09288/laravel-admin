import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  questions: [],
  selectedQuestion: null,
};

const questionSlice = createSlice({
  name: "question",
  initialState,

  reducers: {
    setQuestions: (state, action) => {
      state.questions = action.payload;
    },

    setSelectedQuestion: (state, action) => {
      state.selectedQuestion = action.payload;
    },

    addQuestion: (state, action) => {
      state.questions.unshift(action.payload);
    },

    updateQuestionInList: (state, action) => {
      const index = state.questions.findIndex(
        (question) => question.id === action.payload.id
      );

      if (index !== -1) {
        state.questions[index] = action.payload;
      }
    },

    removeQuestion: (state, action) => {
      state.questions = state.questions.filter(
        (question) => question.id !== action.payload
      );
    },

    clearSelectedQuestion: (state) => {
      state.selectedQuestion = null;
    },
  },
});

export const {
  setQuestions,
  setSelectedQuestion,
  addQuestion,
  updateQuestionInList,
  removeQuestion,
  clearSelectedQuestion,
} = questionSlice.actions;

export default questionSlice.reducer;