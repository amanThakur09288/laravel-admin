import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

const contactMessageSlice = createSlice({
  name: "contactMessages",
  initialState,
  reducers: {
    setContactMessages: (state, action) => {
      state.items = action.payload ?? [];
    },

    removeContactMessage: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
  },
});

export const { setContactMessages, removeContactMessage } =
  contactMessageSlice.actions;

export default contactMessageSlice.reducer;
