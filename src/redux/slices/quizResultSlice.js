import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  results: [],
  currentResult: null,
};

const quizResultSlice = createSlice({
  name: "quizResult",

  initialState,

  reducers: {
    setResults: (state, action) => {
      state.results = action.payload;
    },

    setCurrentResult: (state, action) => {
      state.currentResult = action.payload;
    },

    clearCurrentResult: (state) => {
      state.currentResult = null;
    },

    clearResults: (state) => {
      state.results = [];
      state.currentResult = null;
    },
  },
});

export const {
  setResults,
  setCurrentResult,
  clearCurrentResult,
  clearResults,
} = quizResultSlice.actions;

export default quizResultSlice.reducer;