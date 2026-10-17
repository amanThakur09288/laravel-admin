import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

const serviceSlice = createSlice({
  name: "services",

  initialState,

  reducers: {
    setServices: (state, action) => {
      state.items = action.payload;
    },

    addService: (state, action) => {
      state.items.push(action.payload);
    },

    updateServiceState: (state, action) => {
      const updatedService = action.payload;

      const index = state.items.findIndex(
        (service) => service.id === updatedService.id,
      );

      if (index !== -1) {
        state.items[index] = updatedService;
      }
    },

    removeService: (state, action) => {
      state.items = state.items.filter(
        (service) => service.id !== action.payload,
      );
    },

    clearServices: (state) => {
      state.items = [];
    },
  },
});

export const {
  setServices,
  addService,
  updateServiceState,
  removeService,
  clearServices,
} = serviceSlice.actions;

export default serviceSlice.reducer;
